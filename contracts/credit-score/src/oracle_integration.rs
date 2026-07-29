use soroban_sdk::{Address, Env, Symbol};

/// Storage keys for oracle integration
const ORACLE_CONTRACT_KEY: Symbol = Symbol::short("oracle");
const ORACLE_GATED_ENABLED_KEY: Symbol = Symbol::short("oracle_gated");

/// Initialize oracle integration (called during setup)
pub fn init_oracle_integration(env: &Env, oracle_contract: &Address) {
    env.storage().instance().set(&ORACLE_CONTRACT_KEY, oracle_contract);
    // Start with oracle gating disabled for backward compatibility
    env.storage().instance().set(&ORACLE_GATED_ENABLED_KEY, &false);
}

/// Set the oracle contract address (admin only)
pub fn set_oracle_contract(env: &Env, oracle_contract: &Address) {
    env.storage().instance().set(&ORACLE_CONTRACT_KEY, oracle_contract);
}

/// Get the oracle contract address
pub fn get_oracle_contract(env: &Env) -> Option<Address> {
    env.storage().instance().get(&ORACLE_CONTRACT_KEY)
}

/// Enable oracle-gated mode (admin only)
pub fn set_oracle_gated_enabled(env: &Env, enabled: bool) {
    env.storage().instance().set(&ORACLE_GATED_ENABLED_KEY, &enabled);
}

/// Check if oracle-gated mode is enabled
pub fn is_oracle_gated_enabled(env: &Env) -> bool {
    env.storage()
        .instance()
        .get(&ORACLE_GATED_ENABLED_KEY)
        .unwrap_or(false)
}

/// Require that the caller is the oracle contract (when oracle-gated is enabled)
pub fn require_oracle_caller(env: &Env, caller: &Address) {
    if is_oracle_gated_enabled(env) {
        let oracle_contract = get_oracle_contract(env)
            .expect("oracle contract not set");
        
        if *caller != oracle_contract {
            panic!("caller must be oracle contract when oracle-gated mode is enabled");
        }
    }
    // If oracle-gated is disabled, any caller is allowed (backward compatibility)
}

/// Update score from oracle (only callable by oracle contract)
pub fn update_score_from_oracle(env: &Env, account: &Address, score: i128, model_hash: soroban_sdk::BytesN<32>) {
    // This function is called by the oracle contract after aggregation
    // The oracle contract has already verified the score through the commit-reveal process
    
    // Store the score
    crate::storage::set_score(env, account, score);
    
    // Emit event with model hash for traceability
    crate::events::emit_score_updated_with_model(env, account, score, model_hash);
}
