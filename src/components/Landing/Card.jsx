
export default function Card({ title, description }) {
  return (
    <div>
      <div className="flex flex-col p-4 gap-3 w-[223px] h-[178px] bg-white border border-[#E6DBE3] rounded-lg">
        <h3 className="font-bold text-[16px] leading-[20px] text-[#171217]">
          {title}
        </h3>
        <p className="text-sm leading-[21px] text-[#8A617D]">
          {description}
        </p>
      </div>
    </div>
  );
}
