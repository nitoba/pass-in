terraform {
  required_providers {
    supabase = {
      source  = "supabase/supabase"
      version = "1.2.0"
    }
  }
}

provider "supabase" {
  access_token = var.supabase_token
}
