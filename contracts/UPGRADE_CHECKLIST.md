# Smart Contract Upgrade Checklist

Use this checklist when performing contract upgrades to ensure all steps are completed safely.

## Pre-Upgrade Phase

### Planning
- [ ] Review upgrade requirements and scope
- [ ] Identify breaking changes
- [ ] Document storage migration needs
- [ ] Create upgrade proposal using template
- [ ] Estimate gas costs and migration time
- [ ] Define rollback criteria
- [ ] Schedule upgrade window

### Development
- [ ] Implement new features/fixes
- [ ] Add version-specific migration logic
- [ ] Update contract version number
- [ ] Add upgrade tests
- [ ] Update documentation
- [ ] Code review completed
- [ ] Security review (if major changes)

### Testing
- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] Upgrade tests passing
- [ ] Migration tests passing
- [ ] Rollback tests passing
- [ ] Performance tests passing
- [ ] Gas cost analysis completed

## Testnet Deployment Phase

### Preparation
- [ ] Build optimized WASM
- [ ] Upload WASM to testnet
- [ ] Verify WASM hash
- [ ] Create backup of current testnet state
- [ ] Document current version

### Execution
- [ ] Deploy to testnet
- [ ] Initialize if new deployment
- [ ] Perform upgrade on testnet
- [ ] Verify upgrade success
- [ ] Check version updated correctly

### Verification
- [ ] Test all contract functions
- [ ] Verify storage integrity
- [ ] Check event emissions
- [ ] Monitor for errors (24 hours)
- [ ] Verify gas costs acceptable
- [ ] Test rollback procedure
- [ ] Collect feedback from team

## Mainnet Deployment Phase

### Pre-Deployment
- [ ] Testnet testing completed successfully
- [ ] All stakeholders notified (48 hours notice)
- [ ] Upgrade proposal created and approved
- [ ] Required governance approvals obtained
- [ ] Backup of current mainnet state created
- [ ] Rollback plan documented and ready
- [ ] Monitoring alerts configured
- [ ] Support team on standby

### Deployment Window
- [ ] Announce upgrade start
- [ ] Verify admin credentials
- [ ] Build and upload WASM to mainnet
- [ ] Verify WASM hash matches testnet
- [ ] Execute upgrade transaction
- [ ] Wait for transaction confirmation
- [ ] Verify upgrade success

### Immediate Post-Upgrade (First Hour)
- [ ] Check contract version
- [ ] Test critical functions
- [ ] Verify storage integrity
- [ ] Monitor error rates
- [ ] Check event emissions
- [ ] Verify gas costs
- [ ] Monitor transaction success rate
- [ ] Check for any anomalies

### Extended Monitoring (24 Hours)
- [ ] Monitor contract behavior
- [ ] Track error rates
- [ ] Monitor performance metrics
- [ ] Check user feedback
- [ ] Verify all features working
- [ ] Document any issues
- [ ] Update status page

### Post-Upgrade (7 Days)
- [ ] Continued monitoring
- [ ] Collect metrics
- [ ] Analyze performance
- [ ] Document lessons learned
- [ ] Update documentation
- [ ] Archive upgrade records
- [ ] Close upgrade proposal

## Rollback Phase (If Needed)

### Decision
- [ ] Critical issue identified
- [ ] Rollback criteria met
- [ ] Stakeholders notified
- [ ] Rollback approved

### Execution
- [ ] Announce rollback
- [ ] Execute rollback procedure
- [ ] Verify rollback success
- [ ] Check version reverted
- [ ] Test critical functions
- [ ] Monitor for stability

### Post-Rollback
- [ ] Document rollback reason
- [ ] Analyze root cause
- [ ] Plan fix for issues
- [ ] Update upgrade proposal
- [ ] Schedule new upgrade attempt

## Documentation Phase

### During Upgrade
- [ ] Log all actions taken
- [ ] Record timestamps
- [ ] Document any issues
- [ ] Save transaction hashes
- [ ] Record version changes

### After Upgrade
- [ ] Update changelog
- [ ] Update API documentation
- [ ] Update user guides
- [ ] Create upgrade report
- [ ] Share lessons learned
- [ ] Update runbooks

## Communication Checklist

### Pre-Upgrade
- [ ] Notify stakeholders (48 hours)
- [ ] Post announcement on Discord/Twitter
- [ ] Update status page
- [ ] Send email notifications
- [ ] Document expected downtime

### During Upgrade
- [ ] Post start notification
- [ ] Provide status updates
- [ ] Respond to questions
- [ ] Update status page

### Post-Upgrade
- [ ] Announce completion
- [ ] Share upgrade summary
- [ ] Thank participants
- [ ] Update documentation links
- [ ] Close status incident

## Emergency Procedures

### If Upgrade Fails
1. [ ] Stop upgrade process
2. [ ] Assess situation
3. [ ] Determine if rollback needed
4. [ ] Execute rollback if necessary
5. [ ] Notify stakeholders
6. [ ] Document failure
7. [ ] Plan remediation

### If Critical Bug Found
1. [ ] Assess severity
2. [ ] Determine if immediate rollback needed
3. [ ] Execute emergency rollback
4. [ ] Notify all stakeholders
5. [ ] Investigate root cause
6. [ ] Prepare hotfix
7. [ ] Test hotfix thoroughly
8. [ ] Deploy hotfix

## Governance Checklist (Multi-Sig Upgrades)

### Proposal Phase
- [ ] Create upgrade proposal
- [ ] Submit to governance system
- [ ] Provide detailed description
- [ ] Include risk assessment
- [ ] Attach test results

### Approval Phase
- [ ] Share proposal with approvers
- [ ] Answer questions
- [ ] Collect required approvals
- [ ] Verify quorum reached
- [ ] Check proposal not expired

### Execution Phase
- [ ] Verify all approvals valid
- [ ] Execute through governance
- [ ] Verify execution success
- [ ] Record governance transaction

## Security Checklist

### Before Upgrade
- [ ] Admin keys secured
- [ ] Multi-sig setup verified
- [ ] Access controls reviewed
- [ ] Audit completed (if major)
- [ ] No known vulnerabilities

### During Upgrade
- [ ] Use secure connection
- [ ] Verify transaction details
- [ ] Double-check WASM hash
- [ ] Confirm admin authorization
- [ ] Monitor for suspicious activity

### After Upgrade
- [ ] Verify no unauthorized changes
- [ ] Check access controls intact
- [ ] Monitor for exploits
- [ ] Review security logs
- [ ] Update security documentation

## Metrics to Track

### Performance
- [ ] Transaction success rate
- [ ] Average gas cost
- [ ] Response time
- [ ] Error rate
- [ ] Throughput

### Business
- [ ] Active users
- [ ] Transaction volume
- [ ] Feature adoption
- [ ] User feedback
- [ ] Support tickets

### Technical
- [ ] Contract version
- [ ] Storage usage
- [ ] Event emissions
- [ ] Cross-contract calls
- [ ] Migration duration

## Sign-Off

### Pre-Upgrade Approval
- [ ] Developer: _________________ Date: _______
- [ ] Security: __________________ Date: _______
- [ ] Operations: ________________ Date: _______
- [ ] Product: ___________________ Date: _______

### Post-Upgrade Verification
- [ ] Developer: _________________ Date: _______
- [ ] Operations: ________________ Date: _______
- [ ] QA: _______________________ Date: _______

### Final Sign-Off
- [ ] Project Lead: ______________ Date: _______
- [ ] Technical Lead: ____________ Date: _______

---

## Notes

Use this section to document any specific notes, issues, or observations during the upgrade process.

---

## Quick Reference

### Upgrade Command
```bash
./contracts/scripts/upgrade-contract.sh <contract-name> <network>
```

### Rollback Command
```bash
./contracts/scripts/rollback-contract.sh <contract-name> <network>
```

### Check Version
```bash
soroban contract invoke --id $CONTRACT_ID --fn get_version
```

### Get Upgrade History
```bash
soroban contract invoke --id $CONTRACT_ID --fn get_upgrade_history
```

---

## Oracle-Gated Migration Checklist

Use this additional checklist when migrating contracts to oracle-gated writes.

### Pre-Migration Planning
- [ ] Review oracle-network contract deployment status
- [ ] Verify oracle nodes are operational
- [ ] Confirm quorum threshold can be met
- [ ] Test oracle integration in development environment
- [ ] Identify all write functions to be oracle-gated
- [ ] Design fallback mechanism for oracle unavailability
- [ ] Plan data migration if needed

### Oracle Integration Development
- [ ] Add oracle-network contract dependency
- [ ] Implement oracle result verification logic
- [ ] Add model hash binding to write functions
- [ ] Implement retry logic for oracle failures
- [ ] Add event emission for oracle-gated writes
- [ ] Update function access controls
- [ ] Add oracle-specific error handling

### Testing
- [ ] Unit tests for oracle integration
- [ ] Integration tests with oracle-network contract
- [ ] Test oracle failure scenarios
- [ ] Test fallback mechanisms
- [ ] Test model hash verification
- [ ] Test event emissions
- [ ] Load testing with oracle delays
- [ ] Security review of oracle integration

### Deployment Preparation
- [ ] Oracle-network contract deployed and verified
- [ ] Minimum number of oracle nodes registered
- [ ] Model versions approved by governance
- [ ] Backend event reconciliation configured
- [ ] Monitoring for oracle events set up
- [ ] Alert thresholds configured

### Migration Execution
- [ ] Deploy updated contract
- [ ] Verify oracle integration working
- [ ] Test oracle-gated writes
- [ ] Monitor oracle event reconciliation
- [ ] Verify fallback mechanisms
- [ ] Check event emissions
- [ ] Monitor for errors

### Post-Migration Verification
- [ ] Verify all oracle-gated writes working
- [ ] Check oracle event reconciliation lag
- [ ] Verify model hash bindings
- [ ] Monitor oracle node participation
- [ ] Check dispute rates
- [ ] Verify fallback mechanisms not triggered
- [ ] Collect performance metrics

### Rollback Planning
- [ ] Document rollback procedure
- [ ] Test rollback to non-oracle-gated version
- [ ] Verify data consistency after rollback
- [ ] Plan communication for rollback

### Oracle Network Monitoring
- [ ] Monitor oracle node availability
- [ ] Track submission variance
- [ ] Monitor dispute rates
- [ ] Track oracle response times
- [ ] Monitor slashing events
- [ ] Check reputation changes

### Communication
- [ ] Notify users of oracle-gated migration
- [ ] Document expected behavior changes
- [ ] Provide migration timeline
- [ ] Explain fallback mechanisms
- [ ] Update user documentation

---

**Remember:** When in doubt, don't upgrade. It's better to delay than to rush and cause issues.
