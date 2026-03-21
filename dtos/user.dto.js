module.exports = class UserDto {
    username
    id
    role
    isActivated

    constructor(model) {
        this.username = model.username
        this.id = model._id
        this.role = model.role
        this.isActivated = model.isActivated
    }
}