import Error from "next/error";
import Link from "next/link";
import { Button, Card, Container } from "react-bootstrap";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function ArtworkCard({objectID}) {
    const {data, error, isLoading} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
    if(isLoading) {
        return null;
    }else{
        if(error || !data.objectID) {
            return <Error statusCode={404} />;
        } else {
            return (<>
                <Card>
                    <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
                    <Card.Body>
                        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                        <Card.Text>
                            <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}<br />
                            <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}<br />
                            <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br /><br />
                            <Link href={`/artwork/${data.objectID}`} passHref>
                                <Button variant="btn btn-outline-primary"><strong>ID: </strong>{data.objectID}</Button>
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>);

        }
    }

}