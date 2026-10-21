<div id="page-settings" class="page-view">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">System Settings</h5>
        <button type="submit" form="settingsForm" class="btn btn-gold">
            <i class="bi bi-floppy me-1"></i> Save Settings
        </button>
    </div>

    <div class="card custom-card p-4">
        <div class="border-bottom pb-4 mb-4">
            <label for="appLanguage" class="form-label fw-semibold">Display Language</label>
            <select id="appLanguage" class="form-select" aria-describedby="appLanguageHelp">
                <option value="en">English</option>
                <option value="my">မြန်မာ (ယူနီကုဒ်)</option>
            </select>
            <small id="appLanguageHelp" class="form-text text-muted">Choose the language used throughout this app. This preference is saved in this browser.</small>
        </div>
        <fieldset class="border-bottom pb-4 mb-4">
            <legend class="form-label fw-semibold mb-1">Color Scheme</legend>
            <small id="colorSchemeHelp" class="form-text text-muted d-block mb-3">Choose a color palette for the app. This preference is saved in this browser.</small>
            <div class="row g-3" role="radiogroup" aria-describedby="colorSchemeHelp">
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="ocean-gold" checked>
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#0F172A"></span><span style="background:#D97706"></span><span style="background:#CCF2FF"></span>
                            </span>
                            <span class="theme-choice-name">Ocean &amp; Gold</span>
                            <span class="theme-choice-description">Current hotel palette</span>
                        </span>
                    </label>
                </div>
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="classic-blue">
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#12304A"></span><span style="background:#2563EB"></span><span style="background:#EFF6FF"></span>
                            </span>
                            <span class="theme-choice-name">Classic Blue</span>
                            <span class="theme-choice-description">Crisp blue with a light finish</span>
                        </span>
                    </label>
                </div>
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="forest-cream">
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#173B32"></span><span style="background:#2F855A"></span><span style="background:#F1F7F1"></span>
                            </span>
                            <span class="theme-choice-name">Forest &amp; Cream</span>
                            <span class="theme-choice-description">Natural green and warm neutrals</span>
                        </span>
                    </label>
                </div>
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="burgundy-rose">
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#4A1D2C"></span><span style="background:#BE5674"></span><span style="background:#FBF3F5"></span>
                            </span>
                            <span class="theme-choice-name">Burgundy &amp; Rose</span>
                            <span class="theme-choice-description">Rich wine tones with soft rose</span>
                        </span>
                    </label>
                </div>
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="slate-teal">
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#263746"></span><span style="background:#0F8B8D"></span><span style="background:#F1F7F8"></span>
                            </span>
                            <span class="theme-choice-name">Slate &amp; Teal</span>
                            <span class="theme-choice-description">Cool slate with a refreshing teal</span>
                        </span>
                    </label>
                </div>
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="royal-plum">
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#30204F"></span><span style="background:#7C5CE0"></span><span style="background:#F5F3FA"></span>
                            </span>
                            <span class="theme-choice-name">Royal Plum</span>
                            <span class="theme-choice-description">Elegant purple with a soft neutral</span>
                        </span>
                    </label>
                </div>
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="coral-reef">
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#083B4C"></span><span style="background:#F5B82E"></span><span style="background:#B83F3A"></span>
                            </span>
                            <span class="theme-choice-name">Coral Reef</span>
                            <span class="theme-choice-description">Bold coral, ocean teal, and golden navigation</span>
                        </span>
                    </label>
                </div>
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="citrus-grove">
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#174B37"></span><span style="background:#F0B323"></span><span style="background:#647D16"></span>
                            </span>
                            <span class="theme-choice-name">Citrus Grove</span>
                            <span class="theme-choice-description">Saturated citrus, marigold, and leafy green</span>
                        </span>
                    </label>
                </div>
                <div class="col-12 col-sm-6 col-xl-4">
                    <label class="theme-choice">
                        <input type="radio" name="color_scheme" value="electric-orchid">
                        <span class="theme-choice-card">
                            <span class="theme-preview" aria-hidden="true">
                                <span style="background:#30204F"></span><span style="background:#38C8B2"></span><span style="background:#6720A0"></span>
                            </span>
                            <span class="theme-choice-name">Electric Orchid</span>
                            <span class="theme-choice-description">Vivid orchid, deep violet, and electric aqua</span>
                        </span>
                    </label>
                </div>
            </div>
        </fieldset>
        <form id="settingsForm" autocomplete="off">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Hotel Name</label>
                    <input type="text" name="hotel_name" class="form-control" placeholder="Grand Luxe Hotel">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Contact Phone</label>
                    <input type="text" name="hotel_phone" class="form-control" placeholder="+1 (555) 123-4567">
                </div>
                <div class="col-12">
                    <label class="form-label">Address</label>
                    <textarea name="hotel_address" class="form-control" rows="3" placeholder="Hotel street address"></textarea>
                </div>
            </div>
        </form>

        <div class="border-top mt-4 pt-4">
            <h6 class="fw-bold mb-3">Database Backup</h6>
            <div class="d-flex flex-wrap align-items-start gap-3">
                <form id="databaseDownloadForm" method="post" action="database-backup.php" class="d-flex flex-wrap align-items-end gap-2">
                    <input type="hidden" name="action" value="download">
                    <div>
                        <label for="downloadAdminPassword" class="form-label">Admin password to download</label>
                        <input type="password" id="downloadAdminPassword" name="admin_password" class="form-control" autocomplete="current-password" required>
                    </div>
                    <button type="submit" class="btn btn-outline-primary">
                        <i class="bi bi-download me-1"></i> Download Backup
                    </button>
                </form>
                <form id="databaseRestoreForm" enctype="multipart/form-data" class="d-flex flex-wrap align-items-end gap-2">
                    <div>
                        <label for="databaseBackupFile" class="form-label">Restore from backup</label>
                        <input type="file" id="databaseBackupFile" name="backup_file" class="form-control" accept=".sql" required>
                    </div>
                    <div>
                        <label for="restoreAdminPassword" class="form-label">Admin password to restore</label>
                        <input type="password" id="restoreAdminPassword" name="admin_password" class="form-control" autocomplete="current-password" required>
                    </div>
                    <button type="submit" class="btn btn-outline-danger">
                        <i class="bi bi-upload me-1"></i> Restore Database
                    </button>
                </form>
            </div>
            <small class="text-muted d-block mt-2">Restoring replaces the current database. Only SQL backups downloaded from this system are supported.</small>
        </div>
    </div>
</div>

<div class="modal fade" id="databasePasswordErrorModal" tabindex="-1" aria-labelledby="databasePasswordErrorModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="databasePasswordErrorModalLabel">Incorrect Admin Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">The administrator password is incorrect. Please try again.</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-gold" data-bs-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>
