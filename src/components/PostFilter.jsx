import React from "react";
import Input from "./UI/input/input";
import Select from "./UI/select/select";

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <Input
        value={filter.query}
        placeholder="Search"
        onChange={(event) =>
          setFilter({ ...filter, query: event.target.value })
        }
      />
      <Select
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sorting by..."
        options={[
          { name: "Sorting by name", value: "title" },
          { name: "Sorting by description", value: "body" },
        ]}
      />
    </div>
  );
};

export default PostFilter;
