import Link from "next/link";

export default function PostCard({ data }: any) {
  return (
    <div className="p-5 border border-primary hover:bg-base-200">
      <Link href={`/post/${data.id}`}>
        <p className="text-2xl font-bold text-primary-content">{data.title}</p>
        <p className="text-lg text-primary-content">
          {data.content.length > 40
            ? `${data.content.substring(0, 40)} ...`
            : data.content}
        </p>
        <p className="text-lg text-primary-content">{data.userId}</p>
      </Link>
    </div>
  );
}
