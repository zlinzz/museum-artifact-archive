import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';

export default function ArtworkID() {
  const router = useRouter();
  const { objectID } = router.query;

    return (<>
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    </>);
}
