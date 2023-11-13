export default function PostCard({ data }: any) {
  return (
    <div>
      <p className="text-2xl font-bold text-primary-content">{data.title}</p>
      <p className="text-lg text-primary-content">{data.content}</p>
      <p className="text-lg text-primary-content">{data.userId}</p>
    </div>
  );
}
