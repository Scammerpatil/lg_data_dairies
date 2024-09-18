import formatDate from "@/helper/DateFormatter";
import timeAgo from "@/helper/formatDistanceToTime";
import { notice } from "@/types/notice";

const NoticeCard = ({ notice }: { notice: notice }) => {
  return (
    <div className="card bg-base-300 w-80 shadow-xl text-base-100 h-[500px]">
      <figure className="bg-transparent h-1/3">
        <img
          src={notice.imageURL}
          alt="Notice"
          className="h-52 object-contain object-center"
        />
      </figure>
      <div className="card-body bg-base-content flex flex-col justify-start items-start">
        <h2 className="card-title">
          {notice.title}
          <div className="badge badge-secondary capitalize">{notice.tags}</div>
        </h2>
        <p className="text-start">{notice.description.slice(0, 100)}</p>
        <div className="card-actions justify-start flex-col">
          <div className="text-start">Created By: {notice.author}</div>
          <div className="badge badge-outline capitalize">
            {notice.authorDepartment}
          </div>
        </div>
        <div className="card-actions justify-start flex-col">
          <div className="capitalize">
            {formatDate(new Date(notice.createdAt))}
          </div>
          <div className="">{timeAgo(new Date(notice.createdAt))}</div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
