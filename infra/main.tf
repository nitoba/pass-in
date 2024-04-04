resource "supabase_project" "pass_in" {
  organization_id   = var.organization_id
  name              = "pass_in"
  database_password = var.db_password
  region            = "sa-east-1"
}
