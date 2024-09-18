import { notice } from "@/types/notice";
import timeAgo from "@/helper/formatDistanceToTime";

const NoticeDialog = ({ notice }: { notice: notice }) => {
  return (
    <dialog id="noticeModal" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="font-bold text-xl text-center">Notice Details</h3>
          <img
            src={
              notice?.imageURL ||
              `https://xsgames.co/randomusers/assets/avatars/male/1.jpg`
            }
            alt="Notice Image"
            className="h-80 object-contain"
          />

          <p className="py-2 text-xl font-semibold text-center">
            {notice?.title || "No Title"}
          </p>

          <p className="text-sm text-base-content">
            {notice?.createdAt
              ? timeAgo(new Date(notice.createdAt))
              : "No Date Available"}
          </p>

          <p className=" text-base">
            {notice?.description || "No description available."}
          </p>

          {notice?.author && (
            <div className="text-center mt-4">
              <span className="block font-semibold">
                Author: <span className="font-light">{notice.author}</span>
              </span>
              <span className="text-gray-500"></span>
            </div>
          )}

          {notice?.validTill && (
            <div className="text-center mt-4">
              <span className="block font-semibold">
                Expire At:{" "}
                <span className="font-light">
                  {new Date(notice.validTill).toUTCString()}
                </span>
              </span>
              <span className="text-gray-500"></span>
            </div>
          )}

          <div className="modal-action w-full flex justify-center">
            <button type="button" className="btn btn-sm btn-primary">
              Close
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default NoticeDialog;
