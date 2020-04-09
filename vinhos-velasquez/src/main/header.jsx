import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export default props => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Vinhos Velasquez</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/maiorCompra">Maior Compra em 2016</Nav.Link>
            <Nav.Link href="/clientesFieis">Clientes mais fieis</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)