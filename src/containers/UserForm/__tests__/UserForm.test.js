import UserForm from "../index";
import {
  mockCancelUpdate,
  mockCreateUser,
  mockErrorMessage,
  mockSuccessMessage,
  mockUpdateUserList
} from "../__mocks__/UserForm.mocks";

const initialProps = {
  _id: "",
  isEditing: false,
  email: "",
  backgroundInfo: "",
  firstName: "",
  lastName: "",
  userName: "",
  address: {
    street: "",
    suite: "",
    city: "",
    state: "",
    zipCode: ""
  },
  cancelUpdate: mockCancelUpdate,
  submitAction: () => mockCreateUser("success"),
  updateUserList: mockUpdateUserList
};

const initialState = {
  error: "",
  email: "",
  firstName: "",
  lastName: "",
  userName: "",
  backgroundInfo: "",
  street: "",
  state: "",
  suite: "",
  city: "",
  zipCode: "",
  submitted: false
};

const nextState = {
  email: "test@test.com",
  firstName: "Test",
  lastName: "Test",
  userName: "Test",
  backgroundInfo: "Test",
  street: "Test",
  state: "Test",
  suite: "",
  city: "Test",
  zipCode: "Test"
};

describe("Create/Edit User Form", () => {
  let wrapper;
  beforeEach(() => {
    mockAxios.reset();
    wrapper = mount(<UserForm {...initialProps} />, initialState);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("renders a form", () => {
    expect(wrapper.find("form.formContainer")).toHaveLength(1);
  });

  it("submits the form if required fields are filled in", async () => {
    wrapper.setState({ ...nextState });
    wrapper.find("form").simulate("submit");
    await Promise.resolve();
    expect(mockCreateUser).toHaveBeenCalled();
    expect(mockUpdateUserList).toHaveBeenCalledWith(
      mockSuccessMessage.data.message
    );
  });

  it("displays a field error if a field is empty when sumbitted", () => {
    wrapper.find("form").simulate("submit");
    expect(wrapper.find("span.errorStyle").length).toBe(9);
  });

  describe("if editing", () => {
    beforeEach(() => {
      wrapper.setProps({ isEditing: true });
    });

    it("displays a Cancel button", () => {
      expect(wrapper.find("div.cancelContainer")).toHaveLength(1);
    });

    it("closes the form if the Cancel button is clicked", () => {
      wrapper
        .find("div.cancelContainer")
        .find("button")
        .simulate("click");
      expect(mockCancelUpdate).toHaveBeenCalled();
    });
  });

  describe("displays a form error dialog box if API call fails", () => {
    beforeEach(async () => {
      wrapper.setState({ ...nextState });
      wrapper.setProps({ submitAction: () => mockCreateUser() });
      wrapper.find("form").simulate("submit");
      await Promise.resolve();
    });

    it("renders", () => {
      wrapper.update();
      expect(wrapper.find("div.errorContainer")).toHaveLength(1);
      expect(wrapper.find("p.errorStyle").text()).toContain(mockErrorMessage);
    });

    it("closes", () => {
      wrapper.update();
      wrapper.find("button.closeButton").simulate("click");
      expect(wrapper.find("div.errorContainer")).toHaveLength(0);
    });
  });
});
