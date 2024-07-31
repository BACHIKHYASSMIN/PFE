import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './GraphStyle.css';
import { useTranslation } from 'react-i18next';
const Neo4jGraphD3 = () => {
  const [elements, setElements] = useState({ nodes: [], edges: [] });
  const location = useLocation();
  const navigate = useNavigate();
  const [matId, setMatId] = useState(0);
  const { t,i18n } = useTranslation();
  const toggleLang = (lang) => {
    i18n.changeLanguage(lang);
  }
  const svgRef = useRef(null);

  const legend = [
    { color: 'orange', label: t("Header.Prod") },
    { color: 'gold', label:  t("Header.Ouv") },
    { color: 'crimson', label:  t("Header.Monu") },
   // { color: 'aquamarine', label: 'ConstruirRelation' },
    { color: 'blue', label:  t("Header.Mat") },
    { color: 'green',label:  t("Header.Periode") },
    { color: 'red', label:  t("Header.Place") },
    { color: 'violet', label: t("Header.Path") }
  ];

  const fetchGraphData = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/nodes');
      const responseData = response.data;

      if (!responseData.nodes || !responseData.edges) {
        console.error('Invalid data format:', responseData);
        return;
      }

      // Filter nodes to include only those connected by edges
      const connectedNodes = filterConnectedNodes(responseData.nodes, responseData.edges);

      // Format elements for D3.js
      const { nodes, edges } = formatElements(connectedNodes, responseData.edges);

      console.log('Formatted nodes:', nodes);
      console.log('Formatted edges:', edges);

      setElements({ nodes, edges });
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const filterConnectedNodes = (nodes, edges) => {
    const connectedNodeIds = new Set();

    edges.forEach(edge => {
      connectedNodeIds.add(edge.startNodeElementId);
      connectedNodeIds.add(edge.endNodeElementId);
    });

    return nodes.filter(node => connectedNodeIds.has(node.id));
  };

  const formatElements = (nodes, edges) => {
    const formattedNodes = nodes.map(item => ({
      id: item.id,
      label: item.designation,
      group: item.labels[0], // Assuming labels represent groups for color coding
      x: Math.random() * 800,
      y: Math.random() * 600
    }));

    const formattedEdges = edges.map(edge => ({
      source: edge.startNodeElementId,
      target: edge.endNodeElementId,
      value: 1 // Default value for edge width or strength
    }));

    return { nodes: formattedNodes, edges: formattedEdges };
  };

  useEffect(() => {
    fetchGraphData();

    const queryParams = queryString.parse(location.search);
    const selectedMaterials = queryParams.selectedMaterials;

    if (selectedMaterials) {
      const materialIds = Array.isArray(selectedMaterials) ? selectedMaterials : [selectedMaterials];
      const materialId = materialIds[0];
      setMatId(materialId);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (matId) {
          await fetchSubGraph(matId);
        }
      } catch (error) {
        console.error('Error fetching subgraph:', error);
      }
    };

    fetchData();
  }, [matId]);

  const fetchSubGraph = async (nodeId) => {
    try {
      setElements({ nodes: [], edges: [] });
      const response = await axios.get(`http://localhost:2000/api/nodes/subgraph/${nodeId}`);
      const responseData = response.data;

      if (!responseData.nodes || !responseData.edges) {
        console.error('Invalid data format:', responseData);
        return;
      }

      const { nodes, edges } = formatElements(responseData.nodes, responseData.edges);
      console.log('Subgraph nodes:', nodes);
      console.log('Subgraph edges:', edges);
      setElements({ nodes, edges });
    } catch (error) {
      console.error('Error fetching subgraph:', error);
    }
  };

  useEffect(() => {
    if (svgRef.current) {
      // Nettoyer l'élément SVG
      d3.select(svgRef.current).selectAll("*").remove();
  
      const width = 928;
      const height = 600;
      const color = d3.scaleOrdinal(d3.schemeCategory10);
  
      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;")
        .call(d3.zoom()
          .scaleExtent([0.5, 4]) // Limite de zoom min et max
          .on("zoom", zoomed));
  
      const g = svg.append("g");
  
      const link = g.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(elements.edges)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));
  
      const node = g.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(elements.nodes, d => d.id) // Utiliser d.id comme clé pour identifier les éléments existants
        .join("circle")
        .attr("r", 10)
        .attr("fill", d => color(d.group))
        .attr("id", d => `node-${d.id}`) // Ajouter un ID unique pour chaque nœud
        .on("click", handleNodeClick); // Ajouter un gestionnaire de clic sur chaque nœud
  
      node.append("title")
        .text(d => d.id);
  
      const labels = g.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(elements.nodes, d => d.id) // Utiliser d.id comme clé pour identifier les éléments existants
        .join("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 10)
        .text(d => d.label)
        .attr("text-anchor", "middle")
        .attr("fill", "#333")
        .style("font-size", "10px");
  
      const simulation = d3.forceSimulation(elements.nodes)
        .force("link", d3.forceLink(elements.edges).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
  
      node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
  
      function ticked() {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
  
        labels
          .attr("x", d => d.x)
          .attr("y", d => d.y - 10);
      }
  
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
  
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
  
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
  
      function zoomed(event) {
        g.attr("transform", event.transform);
      }

      function handleNodeClick(event, d) {
        switch (d.group) {
          case 'Produit':
            navigate(`/produitDetails/${d.id}`);
            break;
          case 'Materiau':
            navigate(`/materiauDetails/${d.id}`);
            break;
          case 'Monument':
            navigate(`/monumentDetails/${d.id}`);
            break;
          case 'Ouvrage':
            navigate(`/ouvrageDetails/${d.id}`);
            break;
          default:
            break;
        }
      }
    }
  }, [elements]);
  
  
  return (
    <div>
      <svg ref={svgRef}></svg>
      <div className="legend">
        <h3>{t("Tokens.legend")}</h3>
        <ul>
          {legend.map((item, index) => (
            <li key={index}>
              <span className="legend-color" style={{ backgroundColor: item.color }}></span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Neo4jGraphD3;
