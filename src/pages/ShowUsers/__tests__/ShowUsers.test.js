import { StaticRouter } from "react-router-dom";
import { ShowUsers } from "../ShowUsers";

window.__CLIENT__ = true;

const users = [
  {
    _id: "88",
    email: "test@test.com",
    firstName: "Test",
    lastName: "Test",
    userName: "Test",
    backgroundInfo: "Test",
    address: {
      street: "Test",
      suite: "",
      city: "Test",
      state: "Test",
      zipCode: "Test"
    }
  }
];

const res = { data: { users } };

const mockFetchUsers = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve(res);
      } else {
        reject(new Error("Unable to fetch users!"));
      }
    })
);

const successMessage = "Successfully deleted Test.";
const resSuccess = { data: { message: successMessage } };

const mockDeleteUser = jest.fn(
  id =>
    new Promise((resolve, reject) => {
      if (id) {
        resolve(resSuccess);
      } else {
        reject(new Error("Unable to delete user!"));
      }
    })
);

const mockSeedDB = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve(res);
      } else {
        reject(new Error("Unable to seed database"));
      }
    })
);

const createUser = jest.fn();
const setPopMessage = jest.fn();
const setPopErrorMessage = jest.fn();
const updateUser = jest.fn();

const initialProps = {
  createUser,
  deleteUser: id => mockDeleteUser(id),
  fetchUsers: () => mockFetchUsers(""),
  seedDB: () => mockSeedDB(""),
  setPopMessage,
  setPopErrorMessage,
  updateUser
};

const context = {};

const mountComponent = (props = {}) =>
  mount(
    <StaticRouter path="/" context={context}>
      <ShowUsers {...props} />
    </StaticRouter>
  );

describe("Show Users", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountComponent({ ...initialProps });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.find("div.usersContainer")).toHaveLength(1);
  });

  it("renders UserListNavigation", () => {
    expect(wrapper.find("div.userListNav")).toHaveLength(1);
  });

  describe("if data is not present during initial load", () => {
    it("initially renders a placeholder", () => {
      expect(wrapper.find("div.placeholderContainer")).toHaveLength(1);
    });

    it("displays NoData component if database returns an empty user list", async () => {
      await Promise.resolve();
      wrapper.update();
      expect(mockFetchUsers).toHaveBeenCalled();
      expect(wrapper.find("div.noDataContainer")).toHaveLength(1);
      expect(setPopErrorMessage).toHaveBeenCalled();
    });

    it("renders DisplayUserList if database contains a user list", async () => {
      wrapper = mountComponent({
        ...initialProps,
        fetchUsers: () => mockFetchUsers("success")
      });
      await Promise.resolve();
      wrapper.update();
      expect(wrapper.find("div.userCard")).toHaveLength(1);
    });

    it("displays an error message if the Seed Database button API call fails", async () => {
      wrapper
        .find("span.seedDatabaseButton")
        .find("button")
        .simulate("click");
      await Promise.resolve();
      expect(setPopErrorMessage).toHaveBeenCalled();
    });

    it("renders DisplayUserList if Seed Database button API call succeeds", async () => {
      wrapper = mountComponent({
        ...initialProps,
        seedDB: () => mockSeedDB("success")
      });
      wrapper
        .find("span.seedDatabaseButton")
        .find("button")
        .simulate("click");
      await Promise.resolve();
      wrapper.update();
      expect(wrapper.find("div.userCard")).toHaveLength(1);
    });
  });

  describe("if data is present during initial load", () => {
    const data = { users };
    beforeEach(() => {
      window.__INITIAL_STATE__ = data;
      wrapper = mountComponent({ ...initialProps });
    });

    it("displays a user list", async () => {
      expect(wrapper.find("div.userCard")).toHaveLength(1);
    });

    it("deletes the current user from the list if API call is successful", async () => {
      wrapper
        .find("span.deleteUser")
        .find("button")
        .simulate("click");

      await Promise.resolve();
      wrapper.update();
      expect(mockDeleteUser).toHaveBeenCalledWith(users[0]._id);
      expect(setPopMessage).toHaveBeenCalledWith(successMessage);
    });

    describe("clicking on the Create New User button", () => {
      beforeEach(() => {
        wrapper
          .find("span.openModalButton")
          .find("button")
          .simulate("click");
      });

      it("opens the Modal displaying the UserForm", () => {
        expect(wrapper.find("form.formContainer")).toHaveLength(1);
      });

      it("clicking on the 'X' button closes the Modal", () => {
        wrapper
          .find("div.modalClose")
          .find("button")
          .simulate("click");
        expect(wrapper.find("form.formContainer")).toHaveLength(0);
      });
    });

    describe("clicking on an edit button (pencil)", () => {
      beforeEach(() => {
        wrapper
          .find("span.editUser")
          .find("button")
          .simulate("click");
      });

      it("renders an edit User Form", () => {
        expect(wrapper.find("form.formContainer")).toHaveLength(1);
      });

      it("clicking on the Cancel button within the edit User Form closes the form", () => {
        wrapper
          .find("div.cancelContainer")
          .find("button")
          .simulate("click");
        expect(wrapper.find("form.formContainer")).toHaveLength(0);
      });
    });
  });
});
