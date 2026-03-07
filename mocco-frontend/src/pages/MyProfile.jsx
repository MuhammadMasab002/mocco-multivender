import CustomButton from "../components/common/CustomButton";
import CustomFormInput from "../components/common/inputs/CustomFormInput";

const MyProfile = () => {
  return (
    <>
      <div className="container w-full max-w-7xl mx-auto sm:px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex justify-between text-gray-600 text-sm mb-6 px-2">
          <p>
            Home /
            <span className="font-semibold text-gray-800"> My Account</span>
          </p>
          <p>
            Welcome!
            <span className="text-red-600 font-semibold"> Md Rimel</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 bg-white rounded shadow p-4">
            <div className="space-y-6 text-sm text-gray-700">
              <div>
                <h5 className="font-semibold mb-2">Manage My Account</h5>
                <ul className="space-y-1 ps-3">
                  <li>
                    <a href="#" className="text-red-600">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-500">
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-500">
                      Payment Options
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-2">My Orders</h5>
                <ul className="space-y-1 ps-3">
                  <li>
                    <a href="#" className="hover:text-red-500">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-500">
                      Returns
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-500">
                      Track Orders
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:text-red-500">
                      Cancellations
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-2">My WishList</h5>
                <ul className="space-y-1 ps-3">
                  <li>
                    <a href="#" className="hover:text-red-500">
                      WishList
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Edit Profile Form */}
          <section className="flex-1 bg-white rounded shadow p-6">
            <h3 className="text-red-600 font-semibold mb-6 text-lg">
              Edit Your Profile
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              {/* First Name */}
              <div className="flex flex-col">
                <CustomFormInput
                  label={"First Name"}
                  type={"text"}
                  placeholder={"First Name"}
                  name="fName"
                  icon={false}
                  //   value={fName}
                  //   onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <CustomFormInput
                  label={"Last Name"}
                  type={"text"}
                  placeholder={"Last Name"}
                  name="lName"
                  icon={false}
                  //   value={lName}
                  //   onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <CustomFormInput
                  label={"Email"}
                  type={"email"}
                  placeholder={"Email"}
                  name="email"
                  icon={false}
                  //   value={email}
                  //   onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <CustomFormInput
                  label={"Address"}
                  type={"text"}
                  placeholder={"Address"}
                  name="address"
                  icon={false}
                  //   value={address}
                  //   onChange={handleChange}
                  required
                />
              </div>

              {/* Password Changes - Full Width */}
              <div className="md:col-span-2 flex flex-col space-y-4">
                <CustomFormInput
                  label={"Current Password"}
                  type="password"
                  placeholder="Current Password"
                  name="currentPassword"
                  icon={false}
                  //   value={currentPassword}
                  //   onChange={handleChange}
                  required
                />
                <CustomFormInput
                  label={"New Password"}
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  icon={false}
                  //   value={cPassword}
                  //   onChange={handleChange}
                  required
                />
                <CustomFormInput
                  label={"Confirm New Password"}
                  type="password"
                  placeholder="Confirm New Password"
                  name="cNewPassword"
                  icon={false}
                  //   value={cNewPassword}
                  //   onChange={handleChange}
                  required
                />
              </div>
            </form>

            {/* Buttons */}
            <div className="w-full flex items-center justify-end mt-6 gap-3">
              <div>
                <CustomButton
                  buttonText={"Cancel"}
                  type="submit"
                  variant={"secondary"}
                  onClick={() => alert("Changes cancelled")}
                />
              </div>
              <div>
                <CustomButton
                  buttonText={"Save Changes"}
                  type="submit"
                  variant={"danger"}
                  onClick={() => alert("Changes save successfully")}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
