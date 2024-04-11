import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;
export default function Artwork() {
    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    
    const {data, error, isLoading} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    useEffect(() => {
        let filteredResults = validObjectIDList.objectIDs.filter(x => data?.objectIDs?.includes(x));

        if (data !== null && data !== undefined) {
            const results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
    }, [data])


    function previousPage() {
        if (page > 1) {
            setPage(page-1);
        }
    }

    function nextPage() {
        if (page < artworkList.length) {
            setPage(page+1);
        }
    }

    if(isLoading) {
        return null;
    }else {
        if(error) {
            console.log(`err:${error}`);
            return <Error statusCode={404} />
        }else {
            if (artworkList !== null && artworkList !== undefined) {
                return (<>
                    <Row className="gy-4">
                        {artworkList.length > 0 && (artworkList[page - 1].map((id) => (
                            <Col lg={3} key={id}><ArtworkCard objectID={id} /></Col>
                        )))}

                        {artworkList.length === 0 && (
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
                    <br />
                    
                    {
                        artworkList.length > 0 && (
                            <Row>
                                <Col>
                                    <Pagination>
                                        <Pagination.Prev onClick={previousPage} />
                                        <Pagination.Item>{page}</Pagination.Item>
                                        <Pagination.Next onClick={nextPage} />
                                    </Pagination>
                                </Col>
                            </Row>
                        )
                    }
                </>);            
            }else{
                return null;
            }
        }
    }
}