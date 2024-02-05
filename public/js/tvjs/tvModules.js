'use strict';

/**
 *  * @ngdoc module
 *   * @name tvModules
 *    * @description
 *     */

angular.module('tvModules', ['ui.bootstrap', 'ngRoute'])
    .config(function($stateProvider) {

        $stateProvider
        /* dashboard */
	        .state('admin-panel.default.dashboard_systems', {
	            url: '/dashboard/systems',
	            controller: 'DashboardSystemsController',
	            templateUrl: 'trueview/layouts/dashboard/dashboard.systems.html',
	            resolve: {
	                serverList: function($q, user, Servers, $rootScope) {
	                    return Servers.getRegisteredServers(user.data.org_id);
	                }
	            },
	            data: {
	                authorizedRoles: [3]
	            }
	        }).state('admin-panel.default.dashboard_overview', {
                url: '/dashboard/overview',
                controller: 'DashboardOverviewController',
                templateUrl: 'trueview/layouts/dashboard/dashboard.overview.html',
                resolve: {
                    serverList: function($q, user, Servers, $rootScope) {
                        return Servers.getRegisteredServers(user.data.org_id);
                    }
                },
                data: {
                    authorizedRoles: [3]
                }
            })
            .state('admin-panel.default.dashboard_storage', {
                url: '/dashboard/storage',
                controller: 'DashboardOverviewController',
                templateUrl: 'trueview/layouts/dashboard/dashboard.storage.html',
                resolve: {
                    serverList: function($q, user, Servers, $rootScope) {
                        return Servers.getRegisteredServers(user.data.org_id);
                    }
                },
                data: {
                    authorizedRoles: [3]
                }
            })
             .state('admin-panel.default.dashboard_networking', {
                url: '/dashboard/networking',
                controller: 'DashboardOverviewController',
                templateUrl: 'trueview/layouts/dashboard/dashboard.networking.html',
                resolve: {
                    serverList: function($q, user, Servers, $rootScope) {
                        return Servers.getRegisteredServers(user.data.org_id);
                    }
                },
                data: {
                    authorizedRoles: [3]
                }
            })
            .state('admin-panel.default.dashboard_zfs', {
                url: '/dashboard/zfs',
                controller: 'DashboardOverviewController',
                templateUrl: 'trueview/layouts/dashboard/dashboard.zfs.html',
                resolve: {
                    serverList: function($q, user, Servers, $rootScope) {
                        return Servers.getRegisteredServers(user.data.org_id);
                    }
                },
                data: {
                    authorizedRoles: [3]
                }
            })
           .state('admin-panel.default.dashboard_log', {
                url: '/dashboard/log',
                controller: 'DashboardLogController',
                templateUrl: 'trueview/layouts/dashboard/dashboard.log.html',
                resolve: {
                    serverList: function($q, user, Servers, $rootScope) {
                        return Servers.getRegisteredServers(user.data.org_id);
                    }
                },
                data: {
                    authorizedRoles: [3]
                }
            })
            .state('admin-panel.default.dashboard_server', {
                url: '/dashboard/overview/server/{id}',
                controller: 'DashboardServerController',
                templateUrl: 'trueview/layouts/dashboard/dashboard.server.html',

                data: {
                    authorizedRoles: [3]
                }
            })
        /* detail page */
            .state('admin-panel.default.dashboard_details', {
                url: '/dashboard/overview/details/{type}',
                controller: 'DashboardDetailsController',
                templateUrl: 'trueview/layouts/dashboard/dashboard.details.html',
                resolve: {
                    serverList: function($q, user, Servers, $rootScope) {
                        return Servers.getActivedServers(user.data.org_id);
                    }
                },
                data: {
                    authorizedRoles: [3]
                }
            })   

        /* ix fleets */
            .state('admin-panel.default.dashboard_ixfleet', {
                url: '/ixfleet',
                controller: 'IxfleetController',
                templateUrl: 'trueview/layouts/ixfleet/ixfleet.html',
                resolve: {
                    serverList: function($q, user, Servers, $rootScope) {
                        return Servers.getRegisteredServers(user.data.org_id);
                    },
                    serverImageMap: function(Servers) {
                        return Servers.getServerImageMap();
                    }
                },
                data: {
                    authorizedRoles: [3]
                }
            })

        /* alerts */
            .state('admin-panel.default.dashboard_alerts', {
                url: '/alerts',
                controller: 'AlertsController',
                templateUrl: 'trueview/layouts/alerts/alerts.html',
                data: {
                    authorizedRoles: [3]
                }
            })

        /* support */
            .state('admin-panel.default.dashboard_support', {
                url: '/support',
                controller: 'SupportController',
                templateUrl: 'trueview/layouts/support/support.html',
                resolve: {
                    ticketList: function($q, user, Tickets, $rootScope) {
                        return Tickets.getTickets(user.data.org_id);
                    }
                },
                data: {
                    authorizedRoles: [3]
                }
            })

            .state('admin-panel.default.dashboard_support_detail', {
                url: '/support/{id}',
                controller: 'SupportDetailController',
                templateUrl: 'trueview/layouts/support/support_detail.html',
                data: {
                    authorizedRoles: [3]
                }
            })

        /* debug/logs */
            .state('admin-panel.default.dashboard_logs', {
                url: '/uploads',
                controller: 'LogsController',
                templateUrl: 'trueview/layouts/logs/logs.html',
	            resolve: {
	                uploadedFiles: function($q, user, UploadFiles, $rootScope) {
	                    return UploadFiles.getUploads(user.data.org_id, 1);
	                }
	            },
                data: {
                    authorizedRoles: [3]
                }
            })

        /* downloads */
            .state('admin-panel.default.dashboard_downloads', {
                url: '/downloads',
                controller: 'DownloadsController',
                templateUrl: 'trueview/layouts/downloads/downloads.html',
                data: {
                    authorizedRoles: [3]
                }
            })

        /* snapshots */
            .state('admin-panel.default.snapshots', {
                url: '/snapshots',
                controller: 'SnapshotsController',
                templateUrl: 'trueview/layouts/snapshots/snapshots.html',
                data: {
                    authorizedRoles: [3]
                }
            })

        /* settings */
            .state('admin-panel.default.settings_admin', {
                url: '/settings/admin',
                controller: 'SettingsAdminController',
                templateUrl: 'trueview/layouts/settings/admin/settings.admin.html',
                resolve: {
                    serverList: function($q, user, Servers, $rootScope) {
                        return Servers.getAllServers();
                    },
                    orgList: function($q, Orgs) {
                        return Orgs.getOrgs(); 
                    }
                },
                data: {
                    authorizedRoles: [1]
                }
            })
            .state('admin-panel.default.settings_admin_edituser', {
                url: '/settings/admin/edit/user/{id}',
                controller: 'SettingsAdminEditUserController',
                templateUrl: 'trueview/layouts/settings/admin/settings.admin.editUser.html',
                data: {
                    authorizedRoles: [1]
                }
            })
            .state('admin-panel.default.settings_admin_adduser', {
                url: '/settings/admin/add/user',
                controller: 'SettingsAdminAddUserController',
                templateUrl: 'trueview/layouts/settings/admin/settings.admin.addUser.html',
                data: {
                    authorizedRoles: [1]
                }
            })
            .state('admin-panel.default.settings_admin_editorg', {
                url: '/settings/admin/edit/org/{id}',
                controller: 'SettingsAdminEditOrgController',
                templateUrl: 'trueview/layouts/settings/admin/settings.admin.editOrg.html',
                data: {
                    authorizedRoles: [1]
                }
            })
            .state('admin-panel.default.settings_admin_addorg', {
                url: '/settings/admin/add/org',
                controller: 'SettingsAdminAddOrgController',
                templateUrl: 'trueview/layouts/settings/admin/settings.admin.addOrg.html',
                data: {
                    authorizedRoles: [1]
                }
            })

            .state('admin-panel.default.settings_admin_editServer', {
                url: '/settings/admin/edit/server/{id}',
                controller: 'SettingsAdminEditServerController',
                templateUrl: 'trueview/layouts/settings/admin/settings.admin.editServer.html',
                data: {
                    authorizedRoles: [1]
                }
            })
            .state('admin-panel.default.settings_servers', {
                url: '/settings/servers',
                controller: 'SettingsServersController',
                templateUrl: 'trueview/layouts/settings/servers/settings.servers.html',
                data: {
                    authorizedRoles: [2]
                }
            })
            .state('admin-panel.default.settings_servers_details', {
                url: '/settings/servers/{id}',
                controller: 'SettingsServersDetailsController',
                templateUrl: 'trueview/layouts/settings/servers/settings.servers.detail.html',
                data: {
                    authorizedRoles: [2]
                }
            })
            .state('admin-panel.default.settings_profile', {
                url: '/settings/profile',
                controller: 'SettingsProfileController',
                templateUrl: 'trueview/layouts/settings/profile/settings.profile.html',
                data: {
                    authorizedRoles: [3]
                }
            })
            .state('admin-panel.default.settings_tools', {
                url: '/settings/tools',
                controller: 'SettingsToolsController',
                templateUrl: 'trueview/layouts/settings/tools/settings.tools.html',
                data: {
                    authorizedRoles: [3]
                }
            })

    })
    .run(function (SideMenu) {
        SideMenu.addMenu({
            name: 'Dashboard',
            icon: 'icon-dashboard',
            type: 'dropdown',
            priority: 1.0,
            children: [
	            {
	                name: 'Fleet Summary',
	                icon: 'fa fa-area-chart',
	                state: 'admin-panel.default.dashboard_systems',
	                type: 'link',
	                level: '3'
	            },
	            {
                    name: 'Overview',
                    icon: 'fa fa-area-chart',
                    state: 'admin-panel.default.dashboard_overview',
                    type: 'link',
                    level: '3'
                },
                {
                    name: 'Networking',
                    icon: 'fa fa-eye',
                    state: 'admin-panel.default.dashboard_networking',
                    type: 'link',
                    level: '3'
                },
                {
                    name: 'Storage',
                    icon: 'fa fa-folder-o',
                    state: 'admin-panel.default.dashboard_storage',
                    type: 'link',
                    level: '3'
                },
                {
                    name: 'ZFS',
                    icon: 'fa fa-folder-o',
                    state: 'admin-panel.default.dashboard_zfs',
                    type: 'link',
                    level: '3'
                },
                {
                    name: 'Log Viewer',
                    icon: 'fa fa-hospital-o',
                    state: 'admin-panel.default.dashboard_log',
                    type: 'link',
                    level: '3'
                }
              /*
                 ,
                {
                    name: 'Systems',
                    state: 'admin-panel.default.dashboard_systems',
                    type: 'link',
                    level: '3'
                }
                */
            ]
        });

        SideMenu.addMenu({
            name: 'iX Fleet',
            icon: 'fa fa-rebel',
            state: 'admin-panel.default.dashboard_ixfleet',
            type: 'link',
            level: '3'
        });

        SideMenu.addMenu({
            name: 'Alerts',
            icon: 'fa fa-exclamation-triangle',
            state: 'admin-panel.default.dashboard_alerts',
            type: 'link',
            level: '3'
        });

        SideMenu.addMenu({
            name: 'Support',
            icon: 'fa fa-ticket',
            state: 'admin-panel.default.dashboard_support',
            type: 'link',
            level: '3'
        });

        SideMenu.addMenu({
            name: 'Uploads',
            icon: 'fa fa-bug',
            state: 'admin-panel.default.dashboard_logs',
            type: 'link',
            level: '3'
        });

        SideMenu.addMenu({
            name: 'Downloads',
            icon: 'fa fa-download',
            state: 'admin-panel.default.dashboard_downloads',
            type: 'link',
            level: '3'
        });

      
        SideMenu.addMenu({
            name: 'Settings',
            icon: 'fa fa-cogs',
            type: 'dropdown',
            children: [
                {
                    name: 'Admin',
                    icon: 'fa fa-wrench',
                    state: 'admin-panel.default.settings_admin',
                    type: 'link',
                    level: '1'
                },{
                    name: 'Servers',
                    icon: 'fa fa-server',
                    state: 'admin-panel.default.settings_servers',
                    type: 'link',
                    level: '2'
                },{
                    name: 'Profile',
                    icon: 'fa fa-group',
                    state: 'admin-panel.default.settings_profile',
                    type: 'link',
                    level: '3'
                },{
                    name: 'Tools',
                    icon: 'icon-settings',
                    state: 'admin-panel.default.settings_tools',
                    type: 'link',
                    level: '3'
                }]
        });

    });
