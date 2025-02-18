/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(options) {
    Account.create(options.data, (err, response) => {
			if (response && response.success) {
				let formModal = App.getModal("createAccount");
				formModal.close();
				this.element.reset();
				App.update();
				App.getWidget("accounts").update()
			} else {
				console.log("Ошибка при создании счета");
			}
		});
  }
}