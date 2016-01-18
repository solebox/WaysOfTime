class AddCmsNumberToMaps < ActiveRecord::Migration
  def change
    add_column :maps, :cms_number, :string
  end
end
