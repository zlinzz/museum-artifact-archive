import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Card, Col, Row } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    return (<>
        <Row className="gy-4">
            {favouritesList.length > 0 && (favouritesList.map((id) => (
                <Col lg={3} key={id}><ArtworkCard objectID={id} /></Col>
            )))}

            {favouritesList.length === 0 && (
                <Card>
                    <Card.Body>
                        <Card.Title><h4>Nothing Here</h4></Card.Title>
                        <Card.Text>
                            Try searching for something else
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Row>
    </>);
}