import Card from 'react-bootstrap/Card';

export const Reload = () => {
    return (
        <Card className="product-card-modern skeleton-card">
            <div className="card-image-wrapper skeleton-image">
                <div className="skeleton-shimmer"></div>
            </div>
            
            <Card.Body className="card-content">
                <div className="product-header skeleton-header">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-rating"></div>
                </div>

                <div className="product-accordion skeleton-accordion">
                    <div className="skeleton-accordion-header"></div>
                    <div className="skeleton-description">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>

                <div className="product-footer skeleton-footer">
                    <div className="price-section">
                        <div className="skeleton-price"></div>
                    </div>
                    <div className="skeleton-button"></div>
                </div>
            </Card.Body>
        </Card>
    );
};