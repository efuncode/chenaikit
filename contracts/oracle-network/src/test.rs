#[cfg(test)]
mod tests {
    use soroban_sdk::{Address, BytesN, Env};
    use super::*;

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let governance = Address::generate(&env);

        OracleNetworkContract::initialize(env.clone(), admin.clone(), governance.clone());
        
        let config = OracleNetworkContract::get_config(env.clone());
        assert_eq!(config.min_stake, 1_000_000);
        assert_eq!(config.quorum_threshold, 5);
    }

    #[test]
    fn test_register_node() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let governance = Address::generate(&env);
        let node = Address::generate(&env);

        OracleNetworkContract::initialize(env.clone(), admin.clone(), governance.clone());
        OracleNetworkContract::register_node(env.clone(), node.clone(), 1_000_000);
        
        let node_info = OracleNetworkContract::get_node(env.clone(), node.clone());
        assert_eq!(node_info.stake, 1_000_000);
        assert_eq!(node_info.reputation, 1000);
        assert!(node_info.is_active);
    }

    #[test]
    #[should_panic(expected = "stake below minimum required")]
    fn test_register_node_insufficient_stake() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let governance = Address::generate(&env);
        let node = Address::generate(&env);

        OracleNetworkContract::initialize(env.clone(), admin.clone(), governance.clone());
        OracleNetworkContract::register_node(env.clone(), node.clone(), 500_000);
    }

    #[test]
    fn test_approve_model_version() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let governance = Address::generate(&env);
        let model_hash = BytesN::from_array(&[1u8; 32]);

        OracleNetworkContract::initialize(env.clone(), admin.clone(), governance.clone());
        OracleNetworkContract::approve_model_version(
            env.clone(),
            governance.clone(),
            model_hash,
            soroban_sdk::String::from_str(&env, "Test model"),
        );
        
        assert!(OracleNetworkContract::is_model_approved(env.clone(), model_hash));
    }

    #[test]
    fn test_commit_reveal_flow() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let governance = Address::generate(&env);
        let node = Address::generate(&env);
        let model_hash = BytesN::from_array(&[1u8; 32]);
        let commit_hash = BytesN::from_array(&[2u8; 32]);
        let salt = BytesN::from_array(&[3u8; 32]);

        OracleNetworkContract::initialize(env.clone(), admin.clone(), governance.clone());
        OracleNetworkContract::approve_model_version(
            env.clone(),
            governance.clone(),
            model_hash,
            soroban_sdk::String::from_str(&env, "Test model"),
        );
        OracleNetworkContract::register_node(env.clone(), node.clone(), 1_000_000);
        
        OracleNetworkContract::submit_commit(env.clone(), node.clone(), commit_hash, model_hash);
        
        let status = OracleNetworkContract::get_submission(env.clone(), env.ledger().sequence());
        assert_eq!(status.commit_count, 1);
    }

    #[test]
    fn test_median_calculation() {
        let env = Env::default();
        let mut scores = soroban_sdk::Vec::new(&env);
        
        scores.push_back(100);
        scores.push_back(200);
        scores.push_back(300);
        scores.push_back(400);
        scores.push_back(500);
        
        let median = aggregation::calculate_median(&env, &scores);
        assert_eq!(median, 300);
    }

    #[test]
    fn test_variance_calculation() {
        let env = Env::default();
        let mut scores = soroban_sdk::Vec::new(&env);
        
        scores.push_back(100);
        scores.push_back(100);
        scores.push_back(100);
        
        let mean = aggregation::calculate_mean(&env, &scores);
        let variance = aggregation::calculate_variance(&env, &scores, mean);
        
        assert_eq!(variance, 0);
    }
}
