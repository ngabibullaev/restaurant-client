import Card from 'react-bootstrap/Card';

export const Reload = () => {
    return (
         <Card className="product-card-horizontal skeleton-card">
            <div className="card-horizontal-wrapper">
                {/* Левая часть - изображение */}
                <div className="card-image-section">
                    <div className="card-image-wrapper-horizontal skeleton-image">
                        <div className="skeleton-shimmer"></div>
                    </div>
                </div>

                {/* Правая часть - информация */}
                <div className="card-info-section">
                    <div className="product-header-horizontal">
                        <div className="skeleton-title-horizontal"></div>
                        <div className="skeleton-rating-horizontal"></div>
                    </div>

                    <div className="skeleton-description-horizontal">
                        <div className="skeleton-line-horizontal"></div>
                        <div className="skeleton-line-horizontal short"></div>
                    </div>

                    <div className="product-footer-horizontal">
                        <div className="skeleton-price-horizontal"></div>
                        <div className="skeleton-button-horizontal"></div>
                    </div>
                </div>
            </div>
        </Card>
    );
};