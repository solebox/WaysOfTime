# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin sqlcustom [app_label]'
# into your database.
from __future__ import unicode_literals

from django.db import models
from django.contrib.gis.db import models


class Audits(models.Model):
    auditable_id = models.IntegerField(blank=True, null=True)
    auditable_type = models.CharField(max_length=255, blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    user_type = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    action = models.CharField(max_length=255, blank=True, null=True)
    audited_changes = models.TextField(blank=True, null=True)
    version = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    comment = models.CharField(max_length=255, blank=True, null=True)
    remote_address = models.CharField(max_length=255, blank=True, null=True)
    association_id = models.IntegerField(blank=True, null=True)
    association_type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'audits'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group_id = models.ForeignKey(AuthGroup)
    permission_id = models.ForeignKey('AuthPermission')

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group_id', 'permission_id'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type_id = models.ForeignKey('DjangoContentType')
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type_id', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user_id = models.ForeignKey(AuthUser)
    group_id = models.ForeignKey(AuthGroup)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user_id', 'group_id'),)


class AuthUserUserPermissions(models.Model):
    user_id = models.ForeignKey(AuthUser)
    permission_id = models.ForeignKey(AuthPermission)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user_id', 'permission_id'),)


class ClientApplications(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    support_url = models.CharField(max_length=255, blank=True, null=True)
    callback_url = models.CharField(max_length=255, blank=True, null=True)
    key = models.CharField(unique=True, max_length=20, blank=True, null=True)
    secret = models.CharField(max_length=40, blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'client_applications'


class Comments(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    commentable_id = models.IntegerField(blank=True, null=True)
    commentable_type = models.CharField(max_length=255, blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', blank=True, null=True)
    user = models.ForeignKey(AuthUser)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Gcps(models.Model):
    map_id = models.IntegerField(blank=True, null=True)
    x = models.FloatField(blank=True, null=True)
    y = models.FloatField(blank=True, null=True)
    lat = models.DecimalField(max_digits=15, decimal_places=10, blank=True, null=True)
    lon = models.DecimalField(max_digits=15, decimal_places=10, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    soft = models.NullBooleanField()
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gcps'


class Groups(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    creator_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'groups'


class GroupsMaps(models.Model):
    group_id = models.IntegerField(blank=True, null=True)
    map_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'groups_maps'
        unique_together = (('map_id', 'group_id'),)


class Imports(models.Model):
    path = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    layer_title = models.CharField(max_length=255, blank=True, null=True)
    map_title_suffix = models.CharField(max_length=255, blank=True, null=True)
    map_description = models.CharField(max_length=255, blank=True, null=True)
    map_publisher = models.CharField(max_length=255, blank=True, null=True)
    map_author = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    layer_id = models.IntegerField(blank=True, null=True)
    uploader_user_id = models.IntegerField(blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    file_count = models.IntegerField(blank=True, null=True)
    imported_count = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'imports'


class Layers(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    bbox = models.CharField(max_length=255, blank=True, null=True)
    owner = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    depicts_year = models.CharField(max_length=4, blank=True, null=True)
    maps_count = models.IntegerField(blank=True, null=True)
    rectified_maps_count = models.IntegerField(blank=True, null=True)
    is_visible = models.NullBooleanField()
    source_uri = models.CharField(max_length=255, blank=True, null=True)
    bbox_geom = models.PolygonField(blank=True, null=True)
    objects = models.GeoManager()

    class Meta:
        managed = False
        db_table = 'layers'


class LayersMaps(models.Model):
    layer_id = models.IntegerField(blank=True, null=True)
    map_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'layers_maps'

class MyMaps(models.Model):
    map_id = models.IntegerField(blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'my_maps'
        unique_together = (('map_id', 'user_id'),)


class Maps(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    filename = models.CharField(max_length=255, blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    mask_status = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    upload_file_name = models.CharField(max_length=255, blank=True, null=True)
    upload_content_type = models.CharField(max_length=255, blank=True, null=True)
    upload_file_size = models.IntegerField(blank=True, null=True)
    upload_file_updated_at = models.DateTimeField(blank=True, null=True)
    bbox = models.CharField(max_length=255, blank=True, null=True)
    publisher = models.CharField(max_length=255, blank=True, null=True)
    authors = models.CharField(max_length=255, blank=True, null=True)
    scale = models.CharField(max_length=255, blank=True, null=True)
    published_date = models.DateTimeField(blank=True, null=True)
    reprint_date = models.DateTimeField(blank=True, null=True)
    owner_id = models.IntegerField(blank=True, null=True)
    public = models.NullBooleanField()
    downloadable = models.NullBooleanField()
    cached_tag_list = models.CharField(max_length=255, blank=True, null=True)
    map_type = models.IntegerField(blank=True, null=True)
    source_uri = models.CharField(max_length=255, blank=True, null=True)
    bbox_geom = models.PolygonField(srid=4236, blank=True, null=True)
    rough_lat = models.DecimalField(max_digits=15, decimal_places=10, blank=True, null=True)
    rough_lon = models.DecimalField(max_digits=15, decimal_places=10, blank=True, null=True)
    rough_centroid = models.PointField(blank=True, null=True)
    rough_zoom = models.IntegerField(blank=True, null=True)
    rough_state = models.IntegerField(blank=True, null=True)
    import_id = models.IntegerField(blank=True, null=True)
    publication_place = models.CharField(max_length=255, blank=True, null=True)
    subject_area = models.CharField(max_length=255, blank=True, null=True)
    unique_id = models.CharField(max_length=255, blank=True, null=True)
    metadata_projection = models.CharField(max_length=255, blank=True, null=True)
    metadata_lat = models.DecimalField(max_digits=15, decimal_places=10, blank=True, null=True)
    metadata_lon = models.DecimalField(max_digits=15, decimal_places=10, blank=True, null=True)
    date_depicted = models.CharField(max_length=4, blank=True, null=True)
    call_number = models.CharField(max_length=255, blank=True, null=True)
    rectified_at = models.DateTimeField(blank=True, null=True)
    gcp_touched_at = models.DateTimeField(blank=True, null=True)
    objects = models.GeoManager()

    class Meta:
        managed = False
        db_table = 'maps'


class Memberships(models.Model):
    user_id = models.IntegerField(blank=True, null=True)
    group_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'memberships'
        unique_together = (('user_id', 'group_id'),)




class OauthNonces(models.Model):
    nonce = models.CharField(max_length=255, blank=True, null=True)
    timestamp = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth_nonces'
        unique_together = (('nonce', 'timestamp'),)


class OauthTokens(models.Model):
    user_id = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=20, blank=True, null=True)
    client_application_id = models.IntegerField(blank=True, null=True)
    token = models.CharField(unique=True, max_length=20, blank=True, null=True)
    secret = models.CharField(max_length=40, blank=True, null=True)
    callback_url = models.CharField(max_length=255, blank=True, null=True)
    verifier = models.CharField(max_length=20, blank=True, null=True)
    authorized_at = models.DateTimeField(blank=True, null=True)
    invalidated_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth_tokens'


class Permissions(models.Model):
    role_id = models.IntegerField()
    user_id = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permissions'


class Roles(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    updated_by = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles'


class SchemaMigrations(models.Model):
    version = models.CharField(unique=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'schema_migrations'


class Taggings(models.Model):
    tag_id = models.IntegerField(blank=True, null=True)
    taggable_id = models.IntegerField(blank=True, null=True)
    taggable_type = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    context = models.CharField(max_length=128, blank=True, null=True)
    tagger_id = models.IntegerField(blank=True, null=True)
    tagger_type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'taggings'
        unique_together = (('tag_id', 'taggable_id', 'taggable_type', 'context', 'tagger_id', 'tagger_type'),)


class Tags(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    taggings_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tags'


class Users(models.Model):
    login = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    encrypted_password = models.CharField(max_length=128)
    password_salt = models.CharField(max_length=255)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    remember_token = models.CharField(max_length=255, blank=True, null=True)
    remember_token_expires_at = models.DateTimeField(blank=True, null=True)
    confirmation_token = models.CharField(max_length=255, blank=True, null=True)
    confirmed_at = models.DateTimeField(blank=True, null=True)
    reset_password_token = models.CharField(max_length=255, blank=True, null=True)
    enabled = models.NullBooleanField()
    updated_by = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    confirmation_sent_at = models.DateTimeField(blank=True, null=True)
    remember_created_at = models.DateTimeField(blank=True, null=True)
    sign_in_count = models.IntegerField()
    current_sign_in_at = models.DateTimeField(blank=True, null=True)
    last_sign_in_at = models.DateTimeField(blank=True, null=True)
    current_sign_in_ip = models.CharField(max_length=255, blank=True, null=True)
    last_sign_in_ip = models.CharField(max_length=255, blank=True, null=True)
    reset_password_sent_at = models.DateTimeField(blank=True, null=True)
    provider = models.CharField(max_length=255, blank=True, null=True)
    uid = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
