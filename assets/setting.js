;(function() {
    const storageKey = 'hotelColorScheme';
    const colorSchemes = new Set([
        'ocean-gold',
        'classic-blue',
        'forest-cream',
        'burgundy-rose',
        'slate-teal',
        'royal-plum',
        'coral-reef',
        'citrus-grove',
        'electric-orchid'
    ]);

    function applyColorScheme(scheme) {
        const selectedScheme = colorSchemes.has(scheme) ? scheme : 'ocean-gold';
        document.documentElement.dataset.colorScheme = selectedScheme;

        const option = document.querySelector('input[name="color_scheme"][value="' + selectedScheme + '"]');
        if (option) {
            option.checked = true;
        }
    }

    let savedScheme = 'ocean-gold';
    try {
        savedScheme = localStorage.getItem(storageKey) || savedScheme;
    } catch (error) {
        console.error('Unable to read the color scheme preference from browser storage.', error);
    }
    applyColorScheme(savedScheme);

    window.setHotelColorScheme = function(scheme) {
        if (!colorSchemes.has(scheme)) {
            console.error('The requested color scheme is not supported.', scheme);
            return;
        }

        applyColorScheme(scheme);
        try {
            localStorage.setItem(storageKey, scheme);
        } catch (error) {
            console.error('Unable to save the color scheme preference in browser storage.', error);
            if (typeof window.showAppToast === 'function') {
                window.showAppToast('The color scheme could not be saved in this browser.');
            }
        }
    };

    document.addEventListener('change', function(event) {
        if (event.target && event.target.matches('input[name="color_scheme"]')) {
            window.setHotelColorScheme(event.target.value);
        }
    });
})();

function loadSettingsPage() {
    const form = document.getElementById('settingsForm');
    if (!form) {
        return;
    }

    $.ajax({
        url: 'server.php',
        type: 'POST',
        dataType: 'json',
        data: { action: 'getSystemSettings' },
        success: function(res) {
            if (!res.success) {
                showAppToast(res.message || 'Unable to load system settings.');
                return;
            }

            const settings = res.settings || {};
            Object.keys(settings).forEach(function(key) {
                const field = form.querySelector('[name="' + key + '"]');
                if (field) {
                    field.value = settings[key] || '';
                }
            });
        },
        error: function() {
            showAppToast('Failed to load system settings.');
        }
    });
}

function showDatabasePasswordError() {
    const modalElement = document.getElementById('databasePasswordErrorModal');
    if (modalElement) {
        bootstrap.Modal.getOrCreateInstance(modalElement).show();
    }
}

function handleDatabaseRequestError(message) {
    if (message === 'The administrator password is incorrect.') {
        showDatabasePasswordError();
        return;
    }
    showAppToast(message || 'Database backup request failed.');
}

$(document).ready(function() {
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(settingsForm);
            formData.append('action', 'saveSystemSettings');

            $.ajax({
                url: 'server.php',
                type: 'POST',
                dataType: 'json',
                data: formData,
                processData: false,
                contentType: false,
                success: function(res) {
                    if (res.success) {
                        showAppToast(res.message || 'Settings saved successfully.');
                        loadHotelBranding();
                    } else {
                        showAppToast(res.message || 'Unable to save settings.');
                    }
                },
                error: function() {
                    showAppToast('Failed to save settings.');
                }
            });
        });
    }

    const databaseDownloadForm = document.getElementById('databaseDownloadForm');
    if (databaseDownloadForm) {
        databaseDownloadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitButton = databaseDownloadForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            try {
                const response = await fetch(databaseDownloadForm.getAttribute('action'), {
                    method: 'POST',
                    body: new FormData(databaseDownloadForm)
                });
                if (!response.ok) {
                    const result = await response.json();
                    handleDatabaseRequestError(result.message);
                    return;
                }

                const blob = await response.blob();
                const contentDisposition = response.headers.get('Content-Disposition') || '';
                const filenameMatch = contentDisposition.match(/filename="([^"]+)"/i);
                const filename = filenameMatch ? filenameMatch[1] : 'hotel-management-backup.sql';
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(downloadUrl);
                databaseDownloadForm.reset();
            } catch (error) {
                showAppToast('Failed to download database backup.');
            } finally {
                submitButton.disabled = false;
            }
        });
    }

    const databaseRestoreForm = document.getElementById('databaseRestoreForm');
    if (databaseRestoreForm) {
        databaseRestoreForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!confirm('Restoring a backup will replace the current database. Continue?')) {
                return;
            }

            const formData = new FormData(databaseRestoreForm);
            formData.append('action', 'restore');
            const submitButton = databaseRestoreForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            $.ajax({
                url: 'database-backup.php',
                type: 'POST',
                dataType: 'json',
                data: formData,
                processData: false,
                contentType: false,
                success: function(res) {
                    showAppToast(res.message || (res.success ? 'Database restored successfully.' : 'Unable to restore database.'));
                    if (res.success) {
                        databaseRestoreForm.reset();
                    }
                },
                error: function(xhr) {
                    const message = xhr.responseJSON && xhr.responseJSON.message;
                    handleDatabaseRequestError(message || 'Failed to restore database.');
                },
                complete: function() {
                    submitButton.disabled = false;
                }
            });
        });
    }
});