import { memo } from "react";

interface Props {
    rating: number;
}

const Rating: React.FC<Props> = memo(({rating}) => (
    <div>
        {[1,2,3,4,5].map((i) => (
            <i key={i} className={`bi ${
                i <= Math.floor(rating) 
                  ? 'bi-star-fill text-warning' 
                  : i - 0.5 <= rating 
                    ? 'bi-star-half text-warning' 
                    : 'bi-star text-muted'
              }`}></i>
        ))}
    </div>
));

export default Rating;