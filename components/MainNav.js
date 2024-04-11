import { Container, Nav, Navbar, Form, Button, NavDropdown} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav(){
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const token = readToken();

    function logout() {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    }

    async function submitForm(e) {
        e.preventDefault();
        if(searchField)
        {
            const queryString = `title=true&q=${searchField}`;
            router.push(`/artwork?${queryString}`);
            setSearchField('');
            setIsExpanded(false);
            setSearchHistory(await addToHistory(queryString));
        }
    }

    function toggleExpanded() {
        setIsExpanded(!isExpanded);
    }

    function handleNavClick() {
        setIsExpanded(false);
    }

    return (<>
        <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-primary">
            <Container>
                <Navbar.Brand>Zoey Lin (Zixin Lin)</Navbar.Brand>

                <Navbar.Toggle onClick={toggleExpanded} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior><Nav.Link  active={router.pathname === "/"} onClick={handleNavClick}>Home</Nav.Link></Link>
                        {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={handleNavClick}>Advanced Search</Nav.Link></Link>}
                    </Nav>
                    &nbsp;

                    {!token && 
                    <Nav>
                        <Link href="/register" passHref legacyBehavior><Nav.Link  active={router.pathname === "/register"} onClick={handleNavClick}>Register</Nav.Link></Link>
                        <Link href="/login" passHref legacyBehavior><Nav.Link  active={router.pathname === "/login"} onClick={handleNavClick}>Log In</Nav.Link></Link>
                    </Nav>
                    }

                    {token && <>
                        <Form onSubmit={submitForm} className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                            <Button className="btn btn-success" type="submit">Search</Button>
                        </Form>&nbsp;
                    </>}   
                    <Nav>
                        {token &&
                            <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleNavClick}>Favourites</NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/history"} onClick={handleNavClick}>Search History</NavDropdown.Item>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/login"} onClick={logout}>Logout</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br /><br /><br />
    </>);
}