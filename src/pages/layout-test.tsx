import Image from 'next/image';

const LayoutTest = () => {
  return (
    <div className="mt-4 columns-2 gap-y-4 space-y-4 [&>*]:rounded-lg [&>*]:border-slate-400 [&>*]:p-4 [&>*]:shadow">
      <Image
        src="https://picsum.photos/400/300/?random"
        alt=""
        objectFit="cover"
        width="400"
        height="300"
        className="aspect-video w-full object-cover"
      />
      <Image
        src="https://picsum.photos/300/400/?random"
        alt=""
        objectFit="cover"
        width="300"
        height="400"
        className="aspect-video w-full object-cover"
      />
      <Image
        src="https://picsum.photos/600/300/?random"
        alt=""
        objectFit="cover"
        width="600"
        height="300"
        className="aspect-video w-full object-cover"
      />
      <div className="aspect-video w-full bg-gray-100">1</div>
      <div className="aspect-square w-full bg-gray-300">2</div>
      <div className="aspect-square w-full bg-gray-500">3</div>
      <div className="aspect-square w-full bg-gray-700">4</div>
    </div>
  );
};

export default LayoutTest;
