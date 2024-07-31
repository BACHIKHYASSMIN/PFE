import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Avatar
} from '@material-ui/core';
import Navbar from './Elements/Navbar';
import axios from 'axios';
import { useAuth } from './AuthContext';

const GestionUtilisateurs = () => {
  const [utilisateursNonAuthentifies, setUtilisateursNonAuthentifies] = useState([]);
  const [utilisateursAuthentifies, setUtilisateursAuthentifies] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userrole, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const { login,role} = useAuth();
console.log('Role',role)
  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/utilisateurs');
      const utilisateurs = response.data;

      const nonAuth = utilisateurs.filter(user => user.Role.toLowerCase() === 'visiteur');
      const auth = utilisateurs.filter(user => user.state.toLowerCase() === 'accepted');

      setUtilisateursNonAuthentifies(nonAuth);
      setUtilisateursAuthentifies(auth);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setRole(user.Role);  // Set default value to user's current role
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  const handleAccepter = () => {
    if (selectedUser) {
      // Ajoutez ici votre logique d'acceptation de l'utilisateur
      setUtilisateursAuthentifies([...utilisateursAuthentifies, { ...selectedUser, state: 'accepted', Role: userrole }]);
      setUtilisateursNonAuthentifies(utilisateursNonAuthentifies.filter(user => user.id !== selectedUser.id));
      handleClose();
    }
  };

  const handleRejeter = () => {
    if (selectedUser) {
      // Ajoutez ici votre logique de rejet de l'utilisateur
      setUtilisateursNonAuthentifies(utilisateursNonAuthentifies.filter(user => user.id !== selectedUser.id));
      handleClose();
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ marginLeft: '12%', color: '#2C3E50' }}>Gestion des Utilisateurs</h1>

      <Typography variant="h6" gutterBottom style={{ marginLeft: '5%', fontWeight: 'bold' }}>Utilisateurs Non Authentifiés</Typography>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom Complet</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Affiliation</TableCell>
              <TableCell>Etat</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilisateursNonAuthentifies.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.Username}</TableCell>
                <TableCell>{user.Affiliation}</TableCell>
                <TableCell>Non Authentifier</TableCell>
                <TableCell>{user.Role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#3498db', color: 'white', fontWeight: 'bold' }}
                    onClick={() => handleOpen(user)}
                  >
                    Modifier Etat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom style={{ marginLeft: '5%', fontWeight: 'bold' }}>Utilisateurs Authentifiés</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom Complet</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Affiliation</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilisateursAuthentifies.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.Username}</TableCell>
                <TableCell>{user.Affiliation}</TableCell>
                <TableCell>
                  <Select
                    value={user.Role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    defaultValue={user.Role} // Set default value here
                  >
                    <MenuItem value="Utilisateur">Utilisateur</MenuItem>
                    <MenuItem value="Administrateur">Administrateur</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Modifier Etat Utilisateur</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modifiez les informations de l'utilisateur ci-dessous.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Nom Complet"
              type="text"
              fullWidth
              value={selectedUser.full_name}
              disabled
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={selectedUser.email}
              disabled
            />
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={selectedUser.Username}
              disabled
            />
            <TextField
              margin="dense"
              label="Affiliation"
              type="text"
              fullWidth
              value={selectedUser.Affiliation}
              disabled
            />
            <Select
              value={userrole}
              onChange={handleRoleChange}
              fullWidth
              defaultValue={selectedUser.Role} // Set default value here
            >
              <MenuItem value="Utilisateur">Utilisateur</MenuItem>
              <MenuItem value="Administrateur">Administrateur</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRejeter} color="secondary">
              Rejeter
            </Button>
            <Button onClick={handleAccepter} color="primary">
              Accepter
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default GestionUtilisateurs;
