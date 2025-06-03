import { Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import useManageImage from "../hooks/useImageChange";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";

const Users = () => {
  const { imagePreviews, handleImageChange, removeImageAtIndex } =
    useManageImage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/home"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-auto text-center hover:bg-green-200 transition-colors"
      >
        Back To Dashboard
      </Link>
      <form className="border-b border-gray-900/10 pb-12 bg-white shadow-md rounded-lg flex flex-col p-4 ">
        <Titulo titulo="User Information" />

        <p className="mt-1 text-sm/6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* First Name */}

          <InputText
            type="text"
            name="first-name"
            label="First Name"
            placeholder="Enter your first name"
            autoComplete="given-name"
            value=""
            onChange={() => {}}
          />

          {/* Last Name */}
          <InputText
            type="text"
            name="last-name"
            label="Last Name"
            placeholder="Enter your last name"
            autoComplete="given-name"
            value=""
            onChange={() => {}}
          />

          {/* Email */}
          <InputText
            type="email"
            name="email"
            label="Email Adress"
            placeholder="Enter your email address"
            value=""
            onChange={() => {}}
          />

          {/* Country */}
          <SelectInput
            label="Country"
            options={[
              { value: "us", label: "United States" },
              { value: "ca", label: "Canada" },
              { value: "mx", label: "Mexico" },
            ]}
            value=""
            onChange={() => {}}
          />
        </div>
        <Button type="submit" text="Save User" onClick={null}/>
      </form>
    </div>
  );
};

export default Users;
