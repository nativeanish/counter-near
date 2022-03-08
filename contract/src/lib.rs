use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize)]
pub struct Counter {
    state: i64,
}

#[near_bindgen]
impl Counter {
    pub fn increment(&mut self) {
        self.state += 1;
    }
    pub fn decrement(&mut self) {
        self.state -= 1;
    }
    pub fn state(&self) -> i64 {
        self.state
    }
}
impl Default for Counter {
    fn default() -> Self {
        Self { state: 0 }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};
    fn get_context(predecessor_account_id: String, storage_usage: u64) -> VMContext {
        VMContext {
            current_account_id: "counter.testnet".to_string(),
            signer_account_id: "anish.testnet".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id,
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }
    #[test]
    fn increment() {
        let context = get_context("anish.testnet".to_string(), 0);
        testing_env!(context);
        let mut contract = Counter::default();
        contract.increment();
        contract.increment();
        assert_eq!(2, contract.state());
    }
    #[test]
    fn decrement() {
        let context = get_context("anish.testnet".to_string(), 0);
        testing_env!(context);
        let mut contract = Counter::default();
        contract.increment();
        contract.increment();
        contract.increment();
        contract.decrement();
        assert_eq!(2, contract.state());
    }
}
