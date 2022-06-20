import React, { useCallback, useState } from "react";
import Gallery from "react-photo-gallery";
import CustomGalleryItem from "./components/CustomGalleryItem";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 4,
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 3,
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 2,
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 1,
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 4,
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 3,
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/XiDA78wAZVw/600x799",
    width: 3,
    height: 4,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/x8xJpClTvR0/800x599",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/u9cG4cuJ6bU/4927x1000",
    width: 4927,
    height: 1000,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/qGQNmBE7mYw/800x599",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/NuO6iTBkHxE/800x599",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/pF1ug8ysTtY/600x400",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/A-fubu9QJxE/800x533",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  },
  {
    src: "https://source.unsplash.com/5P91SF0zNsI/740x494",
    width: 4,
    height: 3,
    name: "Sầm sơn",
    description: "Sầm Sơn là một thành phố ven biển thuộc tỉnh Thanh Hóa, Việt Nam. Thành phố Sầm Sơn được thành lập vào năm 2017 trên cơ sở toàn bộ diện tích và dân số của thị xã Sầm Sơn theo Nghị quyết số 368/NQ-UBTVQH14 của Ủy ban thường vụ Quốc hội.",
    average_score: 5,
  }
];


function Page({ match, history }) {
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <CustomGalleryItem
        selected={selectAll ? true : false}
        key={key}
        margin={"1px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    ),
    [selectAll]
  );

  return (
    <div>
      <Gallery photos={photos} renderImage={imageRenderer} />
    </div>
  );
}

export default Page;