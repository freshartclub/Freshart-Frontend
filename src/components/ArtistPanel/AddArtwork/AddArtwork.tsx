import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import AddArtworkbtn from "./AddArtworkbtn";
import Cancelbtn from "./Cancelbtn";
import logoimg from "../assets/Circle Icon Bagde (4).png";
import vediologo from "../assets/Circle Icon Bagde (5).png";
import { Field, FieldArray, Formik } from "formik";
import { formSchemas } from "../schemas/index";
import { useContext, useRef } from "react";
import { tabsContext } from "../Context/Context";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import P from "../../ui/P";
import Header from "../../ui/Header";
import Button from "../../ui/Button";

const AddArtwork = ({ values, setFieldValue }: any) => {
  const inputRefs = useRef({});

  const initialValues = {
    artworktype: "",
    artworkname: "",
    productDescription: "",
    mainphoto: null,
    additionalimages: null,
    vedio: null,
    vedios: null,
    baseprice: "",
    discounttype: "",
    discounpercentage: "",
    textclass: "",
    vatamount: "",
    sku: "",
    barcode: "",
    artworkstyle: "",
    artworkstyle2: "",
    artwortheme: "",
    weight: "",
    height: "",
    lenght: "",
    width: "",
    productcategory: "",
    producttags: "",
    Fieldlocation: "",
    productstatus: "",
    variations: [{ variationtype: "", variation: "" }],
  };
  const setActiveTab = useContext(tabsContext);

  const artworkOptions = [
    { label: "Subscriber artwork", value: "Subscriber artwork" },
    { label: "Purchase Artwork", value: "Purchase Artwork" },
  ];

  const fields = [
    {
      id: "productcategory",
      name: "productcategory",
      label: "Product Category",
      options: ["Select category", "Painting", "Architecture", "Literature"],
    },
    {
      id: "producttags",
      name: "producttags",
      label: "Product Tags",
      options: ["Select Tags", "Cards", "Business Cards"],
    },
    {
      id: "Fieldlocation",
      name: "Fieldlocation",
      label: "Select Location",
      options: ["Select Location", "Asia", "America", "India"],
    },
  ];

  const statusFields = [
    {
      id: "artworkModule",
      label: "Artwork Module",
      options: ["For subscription", "For sale", "Auction"],
    },
    {
      id: "productStatus",
      label: "Product Status",
      options: ["Draft", "Published", "Archived"],
    },
  ];

  const mediaSections = [
    {
      label: "Main photo",
      name: "mainphoto",
      type: "image",
      placeholder: "Drag and drop image here, or click add image",
    },
    {
      label: "Additional images",
      name: "additionalimages",
      type: "image",
      placeholder: "Drag and drop image here, or click add image",
    },
    {
      label: "Video",
      name: "video",
      type: "video",
      placeholder: "Drag and drop video here, or click add video",
    },
    {
      label: "Videos",
      name: "videos",
      type: "video",
      placeholder: "Drag and drop video here, or click add video",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchemas}
      onSubmit={(values, action) => {
        console.log(values);
        action.resetForm();
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
        errors,
        touched,
        resetForm,
      }) => (
        <div className="py-10">
          <h2 className="text-black text-[24px] font-bold">Add Artwork</h2>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mt-3 mb-4 mx-2">
              <div className="flex gap-2 items-center ">
                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  onClick={() => setActiveTab}
                >
                  <NavLink
                    to={"../artdashboard"}
                    className="text-[#102030] font-semibold"
                  >
                    Dashboard
                  </NavLink>
                </P>
                <span>
                  <IoIosArrowBack />
                </span>
                <P
                  variant={{ size: "base", theme: "dark", weight: "semiBold" }}
                  onClick={() => setActiveTab}
                >
                  <NavLink
                    to={"../artwork"}
                    className="text-[#102030] font-semibold"
                  >
                    Artwork List
                  </NavLink>
                </P>
                <span>
                  <IoIosArrowBack />
                </span>
                <P
                  variant={{ size: "base", theme: "dark", weight: "normal" }}
                  className="text-[18px] hover:cursor-pointer"
                >
                  Add Artwork
                </P>
              </div>
              <div className="flex gap-2">
                <Cancelbtn text={"Cancel"} onClick={() => resetForm()} />{" "}
                <AddArtworkbtn text={"AddArtwork"} className="text-[#102030]" />
              </div>
            </div>

            <fieldset className="flex gap-8 mx-3 mb-3">
              {artworkOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex gap-2 flex-row-reverse"
                >
                  {option.label}
                  <br />
                  <Field
                    type="radio"
                    name="artworktype"
                    id={option.value}
                    value={option.value}
                  />
                </label>
              ))}
            </fieldset>

            <div className="grid md:grid-cols-4 w-full">
              <div className="md:col-span-3 rounded-md mr-2 p-2">
                <div className="bg-white p-6 rounded-md shadow-md">
                  <Header
                    variant={{
                      size: "base",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="text-[18px] text-black font-semibold mb-4"
                  >
                    General Information
                  </Header>

                  <div className="mb-6">
                    <label className="block text-[14px] font-medium mb-2">
                      Artwork name
                    </label>
                    <Field
                      type="text"
                      name="artworkname"
                      id="artworkname"
                      placeholder="Type product name here..."
                      className="w-full bg-[#F9F9FC] border border-gray-300 rounded-md p-3 outline-none"
                    />
                    {touched.artworkname && errors.artworkname ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.artworkname}
                      </div>
                    ) : null}
                  </div>

                  <>
                    <label className="block text-[14px] font-medium mb-2">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="productDescription"
                      placeholder="Type product description here..."
                      rows={5}
                      className="w-full bg-[#F9F9FC] border border-gray-300 rounded-md p-3 outline-none"
                    />
                    {touched.productDescription && errors.productDescription ? (
                      <div className="error text-red-500 mt-1 text-sm">
                        {errors.productDescription}
                      </div>
                    ) : null}
                  </>
                </div>

                <div className="bg-white p-4 rounded-md mt-4">
                  <h3 className="text-md mb-4 text-black">Media</h3>
                  {mediaSections.map((section, index) => (
                    <div key={index} className="mb-4">
                      <label className="text-base text-[#203F58] font-semibold mb-2">
                        {section.label}
                        <div className="w-full bg-[#F9F9FC] rounded-md p-2 flex flex-col pt-10 items-center justify-center border border-dashed border-[#E0E2E7]">
                          {values[section.name] ? (
                            section.type === "image" ? (
                              <img
                                src={URL.createObjectURL(values[section.name])}
                                alt={section.label}
                                className="w-[90px] h-[60px] rounded-md"
                              />
                            ) : (
                              <video
                                src={URL.createObjectURL(values[section.name])}
                                controls
                                className="w-[90px] h-[60px] rounded-md"
                              />
                            )
                          ) : (
                            <img
                              src={
                                section.type === "image" ? logoimg : vediologo
                              }
                              alt="Default Logo"
                            />
                          )}
                          <p className="text-[14px] py-2 text-[#203F58]">
                            {section.placeholder}
                          </p>
                          <Button
                            variant={{
                              size: "base",
                              fontWeight: "600",
                              rounded: "large",
                            }}
                            className="bg-[#DEDEFA] mt-3"
                            // Prevent Formik validation when clicking to add an image or video
                            onClick={(e) => {
                              e.preventDefault(); // Prevent triggering any form submission or validation
                              inputRefs.current[section.name].click();
                            }}
                          >
                            Add {section.type === "image" ? "Image" : "Video"}
                          </Button>
                          <input
                            type="file"
                            name={section.name}
                            accept={
                              section.type === "image" ? "image/*" : "video/*"
                            }
                            ref={(el) => (inputRefs.current[section.name] = el)}
                            onChange={(event) =>
                              setFieldValue(
                                section.name,
                                event.currentTarget.files[0]
                              )
                            }
                            className="w-full bg-gray-50 rounded-md p-2 opacity-0"
                          />
                        </div>
                      </label>
                      {/* Display validation errors if any */}
                      {touched[section.name] && errors[section.name] && (
                        <div className="text-red-500 text-sm">
                          {errors[section.name]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-white p-4 rounded-md mt-4 border border-[#E0E2E7">
                  <h3 className="text-md text-[#1A1C21] font-semibold mb-4 ]">
                    Pricing
                  </h3>

                  <label className="text-[#203F58] font-semibold mb-2">
                    Base Price
                    <Field
                      type="text"
                      name="baseprice"
                      id="baseprice"
                      placeholder="$ Type base price here..."
                      value={values.baseprice}
                      className="bg-gray-50 border mb-2 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    />
                    {touched.baseprice && errors.baseprice ? (
                      <div className="error text-red-500">
                        {errors.baseprice}
                      </div>
                    ) : null}
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="text-[#203F58] font-semibold ">
                      Discount Type
                      <Field
                        as="select"
                        id="discounttype"
                        name="discounttype"
                        className="bg-gray-50 mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      >
                        <option>Select a discount type</option>
                        <option>Early payment</option>
                        <option>Percentage</option>
                        <option>Buy one, get one free </option>
                      </Field>
                    </label>
                    <label className="text-[#203F58] font-semibold">
                      Discount Percentage (%)
                      <Field
                        type="text"
                        id="discounpercentage"
                        name="discounpercentage"
                        placeholder="Type discount percentage"
                        value={values.discounpercentage}
                        className="bg-gray-50 mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      ></Field>
                      {touched.discounpercentage && errors.discounpercentage ? (
                        <div className="error text-red-500">
                          {errors.discounpercentage}
                        </div>
                      ) : null}
                    </label>
                    <label className="text-[#203F58] font-semibold">
                      Text Class
                      <Field
                        as="select"
                        id="textclass"
                        name="textclass"
                        className="bg-gray-50 mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg   block w-full p-2.5 "
                      >
                        <option>Text Free</option>
                        <option>two</option>
                        <option>three</option>
                        <option>four</option>
                      </Field>
                    </label>
                    <label className="text-[#203F58] font-semibold">
                      VAT Amount (%)
                      <Field
                        type="text"
                        id="vatamount"
                        name="vatamount"
                        placeholder="Type VAT Amount..."
                        value={values.vatamount}
                        className="bg-gray-50 mt-1 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      ></Field>
                      {touched.vatamount && errors.vatamount ? (
                        <div className="error text-red-500">
                          {errors.vatamount}
                        </div>
                      ) : null}
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md mt-4 border border-[#E0E2E7">
                  <h3 className="text-md text-[#1A1C21] font-semibold mb-4">
                    Inventory
                  </h3>
                  <div className="grid md:grid-cols-2">
                    <label className="p-1 text-[14px] font-semibold">
                      SKU
                      <Field
                        type="text"
                        name="sku"
                        id="sku"
                        placeholder="Type Product sku here..."
                        value={values.sku}
                        className="bg-gray-50 border mb-2 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      />
                    </label>
                    <label className="p-1 text-[14px] font-semibold">
                      Barcode
                      <Field
                        type="text"
                        name="barcode"
                        id="barcode"
                        placeholder="Type Product barcode here..."
                        value={values.barcode}
                        className="bg-gray-50 border mb-2 border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5   "
                      />
                    </label>
                  </div>
                </div>
                {/* variation section */}
                <FieldArray name="variations">
                  {({ insert, remove, push }) => (
                    <div className="bg-white p-4 rounded-md mt-4 border border-[#E0E2E7">
                      <h3 className="text-md text-[#1A1C21] font-semibold mb-4 ">
                        Variations
                      </h3>
                      {values.variations.length > 0 &&
                        values.variations.map((variation, index) => (
                          <div key={index} className="flex gap-4">
                            <Field
                              as="select"
                              name={`variations.${index}.variationtype`}
                              placeholder="Variation Type"
                              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 mb-2"
                            >
                              <option>Select a variation</option>
                              <option>Painting</option>
                              <option>Drawing</option>
                              <option>Sculpture</option>
                            </Field>

                            <Field
                              name={`variations.${index}.variation`}
                              placeholder="Variation"
                              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 mb-2"
                            />

                            <div
                              className="w-[4em] h-[2em] rounded-md bg-[#FCDAD7] flex items-center justify-center hover:cursor-pointer"
                              onClick={() => remove(index)}
                            >
                              <RxCross2 className="text-[#F04438]" />
                            </div>
                          </div>
                        ))}

                      <Button
                        variant={{
                          size: "base",
                          fontWeight: "600",
                          rounded: "large",
                        }}
                        onClick={() =>
                          push({ variationtype: "", variation: "" })
                        }
                        className=" bg-[#DEDEFA] mt-3 flex gap-2 items-center"
                      >
                        <GoPlus /> Add Variant
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <div className="bg-white p-4 rounded-md mt-4 border border-[#E0E2E7">
                  <h3 className="text-md text-[#1A1C21] font-semibold mb-4">
                    Additional information
                  </h3>
                  <div className="grid md:grid-cols-2">
                    <label className="p-1 text-[14px] font-semibold">
                      Artwork type
                      <Field
                        as="select"
                        id="artworktype"
                        name="artworktype"
                        placeholder="Artwork Type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Artwork Type</option>
                        <option>Cubism</option>
                        <option>Impressionism</option>
                        <option>Abstract</option>
                        <option>Literature</option>
                      </Field>
                    </label>
                    <label className="p-1 text-[14px] font-semibold">
                      Artwork style
                      <Field
                        as="select"
                        id="artworkstyle"
                        name="artworkstyle"
                        placeholder="Artwork Type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Artwork style</option>
                        <option>Abstract</option>
                        <option>Figurative</option>
                      </Field>
                    </label>
                    <label className="p-1 text-[14px] font-semibold">
                      Artwork theme
                      <Field
                        as="select"
                        id="artwortheme"
                        name="artwortheme"
                        placeholder="Artwork Type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Select theme</option>
                        <option>one</option>
                        <option>two</option>
                      </Field>
                    </label>
                    <label className="p-1 text-[14px] font-semibold">
                      Artwork style2
                      <Field
                        as="select"
                        id="artworkstyle2"
                        name="artworkstyle2"
                        placeholder="Artwork Type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Select Artwork style2</option>
                        <option>one</option>
                        <option>two</option>
                      </Field>
                    </label>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-md mt-4 border border-[#E0E2E7">
                  <h3 className="text-md text-[#1A1C21] font-semibold mb-4">
                    Shiping
                  </h3>
                  <d outline-noneiv className="grid grid-cols-2 md:grid-cols-4">
                    <label className="p-1 text-[14px] font-semibold ">
                      Weight
                      <Field
                        type="text"
                        name="weight"
                        id="weight"
                        placeholder="Product weight..."
                        value={values.weight}
                        className="w-full bg-gray-50 rounded-md p-2 mb-2 border border-[#E0E2E7] outline-none"
                      />
                      {touched.weight && errors.weight ? (
                        <div className="error text-red-500">
                          {errors.weight}
                        </div>
                      ) : null}
                    </label>
                    <label className="p-1 text-[14px] font-semibold">
                      Height
                      <Field
                        type="text"
                        name="height"
                        id="height"
                        placeholder="Product height (cm)..."
                        value={values.height}
                        className="w-full bg-gray-50 rounded-md p-2 mb-2 border border-[#E0E2E7] outline-none"
                      />
                      {touched.height && errors.height ? (
                        <div className="error text-red-500">
                          {errors.height}
                        </div>
                      ) : null}
                    </label>
                    <label className="p-1 text-[14px] font-semibold">
                      Lenght
                      <Field
                        type="text"
                        name="lenght"
                        id="lenght"
                        placeholder="Product lenght (cm)..."
                        value={values.lenght}
                        className="w-full bg-gray-50 rounded-md p-2 mb-2 border border-[#E0E2E7] outline-none"
                      />
                      {touched.lenght && errors.lenght ? (
                        <div className="error text-red-500">
                          {errors.lenght}
                        </div>
                      ) : null}
                    </label>
                    <label className="p-1 text-[14px] font-semibold">
                      Width
                      <Field
                        type="text"
                        name="width"
                        id="width"
                        placeholder="Product width (cm)..."
                        value={values.width}
                        className="w-full bg-gray-50 rounded-md p-2 mb-2 border border-[#E0E2E7] outline-none"
                      />
                      {touched.width && errors.width ? (
                        <div className="error text-red-500">{errors.width}</div>
                      ) : null}
                    </label>
                  </d>
                </div>
              </div>
              {/* ------------------------ */}
              <div className=" rounded-md p-2">
                <div className="bg-white rounded-md p-4 border border-[#E0E2E7]">
                  <Header
                    variant={{ size: "md", theme: "dark", weight: "semiBold" }}
                    className="mb-3"
                  >
                    Category
                  </Header>
                  <>
                    {fields.map(({ id, name, label, options }) => (
                      <div key={id} className="mb-4">
                        <label
                          htmlFor={id}
                          className="block text-base font-semibold text-[#203F58] mb-2"
                        >
                          {label}
                        </label>
                        <Field
                          as="select"
                          id={id}
                          name={name}
                          className="block w-full px-4 py-2 bg-[#F9F9FC] outline-none border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </div>
                    ))}
                  </>
                </div>

                <div className="bg-white mt-4 rounded-md p-4 border border-[#E0E2E7]">
                  <Header
                    variant={{
                      size: "md",
                      theme: "dark",
                      weight: "semiBold",
                    }}
                    className="mb-3"
                  >
                    Status
                  </Header>
                  {statusFields.map(({ id, label, options }) => (
                    <div key={id} className="mb-4">
                      <label
                        htmlFor={id}
                        className="block text-base font-semibold text-[#203F58] mb-2"
                      >
                        {label}
                      </label>
                      <select
                        id={id}
                        name={id}
                        className="w-full p-2.5 bg-[#F9F9FC] border border-gray-300 rounded-lg text-gray-900 placeholder:text-[#333843] placeholder:font-semibold"
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mt-4 border border-[#E0E2E7]">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Promotion
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="promotion"
                      className="block text-base font-semibold text-[#203F58] mb-2"
                    >
                      Promotion
                    </label>
                    <Field
                      as="select"
                      id="promotion"
                      name="promotion"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900  bg-[#F9F9FC]"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default AddArtwork;
