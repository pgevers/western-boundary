import { FC } from 'react';

type HeroImageBlockProps = {
  imageUrl: string;
  heading: string;
  subheading?: string;
  ctaText?: string;
  onClick?: () => void;
};

const HeroImageBlock: FC<HeroImageBlockProps> = ({ imageUrl, heading, subheading, ctaText, onClick }) => {
  return (
    <div
      className="relative w-full h-96 md:h-[500px] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{heading}</h1>
        {subheading && <p className="text-lg md:text-xl mb-4">{subheading}</p>}
        {ctaText && (
          <button
            onClick={onClick}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroImageBlock;
