function loadUsersPage() {
	const tbody = document.getElementById('usersTableBody');
	if (!tbody) {
		return;
	}

	tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Loading users...</td></tr>';
	$.ajax({
		url: 'server.php',
		type: 'POST',
		dataType: 'json',
		data: { action: 'getUsersList' },
		success: function(res) {
			if (!res.success) {
				tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger py-4">' + (res.message || 'Unable to load users.') + '</td></tr>';
				return;
			}

			const users = res.users || [];
			if (!users.length) {
				tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No users found.</td></tr>';
				return;
			}

			tbody.innerHTML = users.map(function(user) {
				const isAdmin = user.role === 'admin';
				const status = isAdmin ? 'Active' : (user.status || 'Active');
				const statusClass = (status === 'Inactive') ? 'bg-secondary' : 'bg-success';
				const roleLabels = {
					admin: 'Admin',
					manager: 'Manager',
					receptionist: 'Receptionist',
					subscriber: 'Subscriber'
				};
				const roleLabel = roleLabels[user.role] || user.role || 'Subscriber';
				const deleteButton = isAdmin
					? '<button style="visibility: hidden;" ><i class="bi bi-trash"></i></button>'
					: '<button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteUser(' + (user.id || 0) + ', \'' + (user.full_name || user.username || 'User').replace(/'/g, "\\'") + '\')"><i class="bi bi-trash"></i></button>';

				return '<tr>' +
					'<td>' + (user.full_name || '-') + '</td>' +
					'<td>' + (user.username || '-') + '</td>' +
					'<td><span class="badge rounded-pill bg-light text-dark border">' + roleLabel + '</span></td>' +
					'<td>' + (user.created_at || '-') + '</td>' +
					'<td><span class="badge rounded-pill ' + statusClass + '">' + status + '</span></td>' +
					'<td class="text-center">' +
						'<button type="button" class="btn btn-sm btn-outline-primary me-1" onclick="openEditUserModal(' + (user.id || 0) + ')"><i class="bi bi-pencil-square"></i></button>' +
						deleteButton +
					'</td>' +
				'</tr>';
			}).join('');
		},
		error: function() {
			tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger py-4">Failed to load users.</td></tr>';
		}
	});
}

window.openEditUserModal = function(userId) {
	$.ajax({
		url: 'server.php',
		type: 'POST',
		dataType: 'json',
		data: { action: 'getUserDetails', userId: userId },
		success: function(res) {
			if (!res.success || !res.user) {
				showAppToast(res.message || 'Unable to load user details.');
				return;
			}
			fillEditUserForm(res.user);
		},
		error: function() {
			showAppToast('Failed to load user details.');
		}
	});
};

function fillEditUserForm(user) {
	const form = document.getElementById('editUserForm');
	if (!form || !user) {
		return;
	}

	form.user_id.value = user.id || '';
	form.full_name.value = user.full_name || '';
	form.username.value = user.username || '';
	form.role.value = user.role || 'subscriber';
	form.status.value = user.role === 'admin' ? 'Active' : (user.status || 'Active');
	form.status.disabled = user.role === 'admin';
	form.password.value = '';
	form.current_password.value = '';
	form.dataset.targetIsAdmin = user.role === 'admin' ? 'true' : 'false';
	const shouldVerifyAdminPassword = form.dataset.targetIsAdmin === 'true'
		&& form.password.value !== '';
	const verificationField = document.getElementById('adminPasswordVerification');
	verificationField.classList.toggle('d-none', !shouldVerifyAdminPassword);
	form.current_password.required = shouldVerifyAdminPassword;
	$('#editUserModal').modal('show');
}

window.deleteUser = function(userId, fullName) {
	const label = fullName || 'this user';
	if (!confirm('Are you sure you want to delete ' + label + '?')) {
		return;
	}

	$.ajax({
		url: 'server.php',
		type: 'POST',
		dataType: 'json',
		data: { action: 'deleteUser', userId: userId },
		success: function(res) {
			if (res.success) {
				showAppToast(res.message || 'User deleted successfully.');
				loadUsersPage();
			} else {
				showAppToast(res.message || 'Unable to delete user.');
			}
		},
		error: function() {
			showAppToast('Failed to delete user.');
		}
	});
};

$(document).ready(function() {
	const createUserForm = document.getElementById('createUserForm');
	if (createUserForm) {
		createUserForm.addEventListener('submit', function(e) {
			e.preventDefault();
			const formData = new FormData(createUserForm);
			formData.append('action', 'createUser');

			$.ajax({
				url: 'server.php',
				type: 'POST',
				dataType: 'json',
				data: formData,
				processData: false,
				contentType: false,
				success: function(res) {
					if (res.success) {
						showAppToast(res.message || 'User created successfully.');
						createUserForm.reset();
						$('#addUserModal').modal('hide');
						loadUsersPage();
					} else {
						showAppToast(res.message || 'Unable to create user.');
					}
				},
				error: function() {
					showAppToast('Failed to create user.');
				}
			});
		});
	}

	const changeOwnPasswordForm = document.getElementById('changeOwnPasswordForm');
	if (changeOwnPasswordForm) {
		const ownPasswordNeedsVerification = document.body.dataset.currentUserRole === 'admin';
		changeOwnPasswordForm.elements.current_password.required = ownPasswordNeedsVerification;
		document.getElementById('ownAdminPasswordVerification').classList.toggle('d-none', !ownPasswordNeedsVerification);
		changeOwnPasswordForm.addEventListener('submit', function(e) {
			e.preventDefault();
			if (changeOwnPasswordForm.password.value !== changeOwnPasswordForm.confirm_password.value) {
				showAppToast('The passwords do not match.');
				return;
			}
			const formData = new FormData(changeOwnPasswordForm);
			formData.append('action', 'changeOwnPassword');
			$.ajax({
				url: 'server.php',
				type: 'POST',
				dataType: 'json',
				data: formData,
				processData: false,
				contentType: false,
				success: function(res) {
					if (res.success) {
						showAppToast(res.message || 'Password changed successfully.');
						changeOwnPasswordForm.reset();
						$('#changeOwnPasswordModal').modal('hide');
					} else {
						showAppToast(res.message || 'Unable to change password.');
					}
				},
				error: function() {
					showAppToast('Failed to change password.');
				}
			});
		});
	}

	const editUserForm = document.getElementById('editUserForm');
	if (editUserForm) {
		const roleSelect = editUserForm.elements.role;
		const statusSelect = editUserForm.elements.status;
		editUserForm.password.addEventListener('input', function() {
			const shouldVerifyAdminPassword = editUserForm.dataset.targetIsAdmin === 'true'
				&& editUserForm.password.value !== '';
			document.getElementById('adminPasswordVerification').classList.toggle('d-none', !shouldVerifyAdminPassword);
			editUserForm.current_password.required = shouldVerifyAdminPassword;
			if (!shouldVerifyAdminPassword) {
				editUserForm.current_password.value = '';
			}
		});
		roleSelect.addEventListener('change', function() {
			const isAdmin = roleSelect.value === 'admin';
			statusSelect.disabled = isAdmin;
			if (isAdmin) {
				statusSelect.value = 'Active';
			}
		});

		editUserForm.addEventListener('submit', function(e) {
			e.preventDefault();
			if (roleSelect.value === 'admin') {
				statusSelect.value = 'Active';
			}
			const formData = new FormData(editUserForm);
			if (roleSelect.value === 'admin') {
				formData.set('status', 'Active');
			}
			formData.append('action', 'updateUser');

			$.ajax({
				url: 'server.php',
				type: 'POST',
				dataType: 'json',
				data: formData,
				processData: false,
				contentType: false,
				success: function(res) {
					if (res.success) {
						showAppToast(res.message || 'User updated successfully.');
						editUserForm.reset();
						$('#editUserModal').modal('hide');
						loadUsersPage();
					} else {
						showAppToast(res.message || 'Unable to update user.');
					}
				},
				error: function() {
					showAppToast('Failed to update user.');
				}
			});
		});
	}
});
