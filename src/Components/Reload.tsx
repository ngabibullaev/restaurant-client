import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';

export const Reload = () => {
    return (
        <div>
            <Card className='foods' style={{ height: "460px" }}>
                <div style={{ height: "180px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Spinner className='spinners' animation="border" />
                </div>
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder as={Card.Title} animation="glow" style={{ paddingTop: "80px" }}>
                        <Placeholder className='textPrice mb-3' xs={2} />
                        <Placeholder.Button className='btnAdd' style={{marginLeft: "5.2em"}} variant="outline-dark" xs={6} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </div>
    )
};