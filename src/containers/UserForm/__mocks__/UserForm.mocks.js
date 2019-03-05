export const mockCancelUpdate = jest.fn();

export const mockSuccessMessage = {
  data: { message: "Successfully created Test!" }
};

export const mockErrorMessage = new Error("Unable to complete that request!");

export const mockCreateUser = jest.fn(
  success =>
    new Promise((resolve, reject) => {
      if (success) {
        resolve(mockSuccessMessage);
      } else {
        reject(mockErrorMessage);
      }
    })
);

export const mockUpdateUserList = jest.fn();
