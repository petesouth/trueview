'use strict';

/**
 * @ngdoc provider
 * @name tvSkinsProvider
 * @module tv
 * @kind provider
 *
 * @description
 *
 * Wrapper for material themes
 */
 
angular.module('tv')
.provider('tvSkins', SkinsProvider)
.run(addSkinToScope);

function SkinsProvider($mdThemingProvider, tvThemingProvider, APP) {
    var skins = {};
    var currentSkin = null;
    var useSkinCookie = false;

    return {
        skin: function(id, name) {
            if(skins[id] !== undefined ) {
                return skins[id];
            }

            var skin = new Skin(id, name, $mdThemingProvider, tvThemingProvider);

            skins[id] = skin;

            return skins[id];
        },
        setSkin: function(id) {
            if(skins[id] === undefined) {
                console.error('No such skin as ' + id);
                return;
            }

            // set skin to selected skin
            currentSkin = skins[id];

            // override the skin if cookie is enabled and has been set
            if(useSkinCookie) {
                // we need to check cookies to see if skin has been saved so inject it
                var $cookies;
                angular.injector(['ngCookies']).invoke(['$cookies', function(cookies) {
                    $cookies = cookies;
                }]);
                // if we have a cookie set then override the currentSkin
                var freenasSkin = $cookies.get('freenas-skin');
                if(freenasSkin !== undefined) {
                    var cookieTheme = angular.fromJson(freenasSkin);
                    currentSkin = skins[cookieTheme.skin] !== undefined ? skins[cookieTheme.skin] : skins[APP.defaultSkin];
                }
            }

            // make material load the themes needed for the skin
            currentSkin.loadThemes();

            return currentSkin;
        },
        useSkinCookie: function(skinCookie) {
            useSkinCookie = skinCookie;
        },
        $get: function() {
            return {
                getCurrent: function() {
                    return currentSkin;
                },
                getSkins: function() {
                    return skins;
                }
            };
        }
    };
}

function Skin(id, name, $mdThemingProvider, tvThemingProvider) {
    var THEMABLE_ELEMENTS = ['sidebar', 'logo', 'toolbar', 'content', 'footer'];
    var self = this;
    self.id = id;
    self.name = name;
    self.elements = {};

    THEMABLE_ELEMENTS.forEach(function(element) {
        self[element + 'Theme'] = function setElementTheme(themeName) {
            self.elements[element] = themeName;
            return self;
        };
    });

    self.loadThemes = function() {
        // go through each element
        for (var element in self.elements) {
            // register theme with mdThemingProvider (will load css in the header)
            var theme = tvThemingProvider.theme(self.elements[element]);

            $mdThemingProvider.theme(theme.name)
            .primaryPalette(theme.colors.primary.name, theme.colors.primary.hues)
            .accentPalette(theme.colors.accent.name, theme.colors.accent.hues)
            .warnPalette(theme.colors.warn.name, theme.colors.warn.hues)
            .dark(theme.isDark);
        }

        $mdThemingProvider.setDefaultTheme(self.elements.content);
    };
}

function addSkinToScope($rootScope, tvSkins) {
    $rootScope.tvSkin = tvSkins.getCurrent();
}