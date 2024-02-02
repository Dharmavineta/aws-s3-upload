import { uploadFile } from "@/actions";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import Button from "./Button";

const initialState = { message: null };

const Form = () => {
  const [state, formAction] = useFormState(uploadFile, initialState);

  return (
    <div>
      <h1>Upload to s3 Bucket</h1>

      <form action={formAction}>
        <input type="file" id="file" name="file" accept="image/*" />
        <Button />
        {state.status && (
          <div className={`${state.status}`}>{state.message}</div>
        )}
      </form>
    </div>
  );
};

export default Form;
