import { StaticRouter } from "react-router-dom";
import { ShowUsers } from "../ShowUsers";
import {
  mockDeleteUser,
  mockFetchUsers,
  mockSeedDB,
  mockSetPopMessage,
  mockSetPopErrorMessage,
  mockUsers
} from "../__mocks__/ShowUsers.mocks";

jest.mock("../../../actions/users", () => ({
  ...require.requireActual("../../../actions/users"),
  fetchUsers: () => mockFetchUsers(),
  deleteUser: id => mockDeleteUser(id),
  seedDB: () => mockSeedDB("")
}));

window.__CLIENT__ = true;

const initialProps = {
  setPopMessage: mockSetPopMessage,
  setPopErrorMessage: mockSetPopErrorMessage
};

const initialState = {
  data: {},
  isEditingID: "",
  isLoading: true,
  openModal: false
};

const context = {};

const mountComponent = (props = {}) =>
  mount(
    <StaticRouter path="/" context={context}>
      <ShowUsers {...props} />
    </StaticRouter>
  );

describe("Show Users Page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ShowUsers {...initialProps} />, initialState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.find("div.usersContainer")).toHaveLength(1);
  });

  it("renders UserListNavigation", () => {
    expect(wrapper.find("UserListNavigation")).toHaveLength(1);
  });

  describe("if data is not present during initial load", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it("initially renders a placeholder", () => {
      expect(wrapper.find("Placeholder")).toHaveLength(1);
    });

    it("displays NoData component if database returns an empty user list", () => {
      wrapper.instance().componentDidMount();

      setTimeout(() => {
        wrapper.update();
        expect(
          wrapper
            .find("DisplayUserList")
            .dive()
            .find("NoData")
        ).toHaveLength(1);
        expect(mockFetchUsers).toHaveBeenCalledWith();
        expect(mockSetPopErrorMessage).toHaveBeenCalledWith(
          "Error: Unable to fetch users!"
        );
      }, 1000);
    });

    it("displays an error message if the Seed Database button API call fails", () => {
      wrapper.instance().handleSeedDatabase();

      setTimeout(() => {
        wrapper.update();
        expect(mockSeedDB).toHaveBeenCalled();
        expect(mockSetPopErrorMessage).toHaveBeenCalledWith(
          "Error: Unable to seed database"
        );
      });
    });
  });

  describe("if data is present during initial load", () => {
    beforeEach(() => {
      window.__INITIAL_STATE__ = { users: mockUsers };
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
      expect(mockDeleteUser).toHaveBeenCalledWith(mockUsers[0]._id);
      expect(mockSetPopMessage).toHaveBeenCalledWith(
        "Successfully deleted Test."
      );
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
