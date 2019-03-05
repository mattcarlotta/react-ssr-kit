export const mockUsers = [
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

export const mockCreateUser = jest.fn();
export const mockSetPopMessage = jest.fn();
export const mockSetPopErrorMessage = jest.fn();
export const mockUpdateUser = jest.fn();

const res = { data: { users: mockUsers } };

export const mockFetchUsers = jest.fn(
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

export const mockDeleteUser = jest.fn(
  id =>
    new Promise((resolve, reject) => {
      if (id) {
        resolve(resSuccess);
      } else {
        reject(new Error("Unable to delete user!"));
      }
    })
);

export const mockSeedDB = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve(res);
      } else {
        reject(new Error("Unable to seed database"));
      }
    })
);
