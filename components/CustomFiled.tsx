"use client";
import { Field } from "formik";
import { useState } from "react";

function CustomFiled({ field, form: { errors, touched }, ...props }: any) {
  const [dirty, setDirty] = useState(false);
  //   console.log(errors, touched);
  // const dirty;
  const { onChange, name } = field;
  return (
    <>
      <div className="relative w-full  group ">
        <label
          className={`absolute z-[2]  bg-red  capitalize       group-hover:left-0 group-hover:top-0 transition-all duration-[300px]
      ${dirty ? "top-0 left-0" : "top-[50%] left-3"} 
      `}
        >
          {"  "}
          {name?.replace("_", " ") + " :"}
        </label>
        <br />
        <input
          {...field}
          {...props}
          onClick={() => {
            setDirty(true);
          }}
        />
      </div>
      {errors[name] && touched[name] ? (
        <div className="text-[#e11d48]">{errors[name]}</div>
      ) : null}
    </>
  );
}

export default CustomFiled;
