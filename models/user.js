module.exports = app => {
  const { badCredentials } = app.shared.authErrors;
  const mongoose = app.get("mongoose");

  // Define user model
  const userSchema = new mongoose.Schema({
    god: { type: Boolean, default: false },
    email: { type: String, unique: true, lowercase: true },
    username: { type: String, unique: true, lowercase: true },
    password: String
  });

  // create new user: User.createUser()
  userSchema.statics.createUser = async function newUser(user) {
    if (!user) throw new Error("User required!");

    try {
      return await this.create(user);
    } catch (err) {
      throw new Error(err);
    }
  };

  // compares a password to the password stored in the model: userIstance.comparePassword()
  userSchema.methods.comparePassword = async function compare(
    incomingPassword
  ) {
    try {
      const isMatch = await bcrypt.compare(incomingPassword, this.password);
      if (!isMatch) throw new Error(badCredentials);

      return isMatch;
    } catch (err) {
      throw new Error(err);
    }
  };

  // Create model class
  mongoose.model("users", userSchema);
};
