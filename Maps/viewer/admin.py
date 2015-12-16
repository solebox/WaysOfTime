from django.contrib import admin
from viewer.models import Maps, MyMaps, Audits, AuthGroup, AuthGroupPermissions, AuthPermission, AuthUser, AuthUserGroups, AuthUserUserPermissions, ClientApplications, Comments, DjangoAdminLog, DjangoContentType, DjangoMigrations, DjangoSession, Gcps, Groups, GroupsMaps, Imports, Layers, LayersMaps, Memberships, OauthNonces, OauthTokens, Permissions, Roles, SchemaMigrations, Taggings, Tags, Users

class AdminMyMaps(admin.ModelAdmin):
    model = Maps
    model = AuthGroup
    model = AuthGroupPermissions
    model = AuthPermission
    model = MyMaps
    model = Audits
    model = AuthUser
    model = AuthUserGroups
    model = AuthUserUserPermissions
    model = ClientApplications
    model = Comments
    model = DjangoAdminLog
    model = DjangoContentType
    model = DjangoMigrations
    model = DjangoSession
    model = Gcps
    model = Groups
    model = GroupsMaps
    model = Imports
    model = Layers
    model = LayersMaps
    model = Memberships
    model = OauthNonces
    model = OauthTokens
    model = Permissions
    model = Roles
    model = SchemaMigrations
    model = Taggings
    model = Tags
    model = Users

admin.site.register(Maps, AdminMyMaps)
admin.site.register(MyMaps, AdminMyMaps)
admin.site.register(Audits, AdminMyMaps)
admin.site.register(AuthGroup, AdminMyMaps)
admin.site.register(AuthGroupPermissions, AdminMyMaps)
admin.site.register(AuthPermission, AdminMyMaps)
admin.site.register(AuthUser, AdminMyMaps)
admin.site.register(AuthUserGroups, AdminMyMaps)
admin.site.register(AuthUserUserPermissions, AdminMyMaps)
admin.site.register(ClientApplications, AdminMyMaps)
admin.site.register(Comments, AdminMyMaps)
admin.site.register(DjangoAdminLog, AdminMyMaps)
admin.site.register(DjangoContentType, AdminMyMaps)
admin.site.register(DjangoMigrations, AdminMyMaps)
admin.site.register(DjangoSession, AdminMyMaps)
admin.site.register(Gcps, AdminMyMaps)
admin.site.register(Groups, AdminMyMaps)
admin.site.register(GroupsMaps, AdminMyMaps)
admin.site.register(Imports, AdminMyMaps)
admin.site.register(Layers, AdminMyMaps)
admin.site.register(LayersMaps, AdminMyMaps)
admin.site.register(Memberships, AdminMyMaps)
admin.site.register(OauthNonces, AdminMyMaps)
admin.site.register(OauthTokens, AdminMyMaps)
admin.site.register(Permissions, AdminMyMaps)
admin.site.register(Roles, AdminMyMaps)
admin.site.register(SchemaMigrations, AdminMyMaps)
admin.site.register(Taggings, AdminMyMaps)
admin.site.register(Tags, AdminMyMaps)
admin.site.register(Users, AdminMyMaps)
