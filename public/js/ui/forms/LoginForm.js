/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
		User.login(options.data, (err, response) => {
			if (response && response.success) {
				this.element.reset();
				App.setState("user-logged");
				let loginModal = App.getModal("login");
				loginModal.close();
			}
		})
  }
}