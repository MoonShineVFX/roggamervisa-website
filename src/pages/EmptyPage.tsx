const EmptyPage = () => {
  return (
    <div>
      {" "}
      <button
        className="text-white bg-blue-500 p-2 rounded-md text-xl"
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: "標題",
                text: "文字描述",
                url: "https://shubo.io/",
              })
              .then(() => console.log("成功！"))
              .catch((error) => console.log("發生錯誤", error));
          }
        }}
      >
        SHARE
      </button>
    </div>
  );
};

export default EmptyPage;
