import Image from 'next/image';
import { ProductsRes } from 'types/products';

type Props = {
  productsRes: ProductsRes;
};

const ProductsSection = ({ productsRes }: Props) => {
  return (
    <div>
      <h2 className="py-4">products</h2>
      <div className="flex justify-center gap-8 flex-wrap">
        {productsRes.data.map((value) => {
          return (
            <div key={value.id}>
              <Image src={value.attributes.eye_catch.data.attributes.url} width="400" height="210" alt="works" />
              <div>{value.attributes.heading}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsSection;
