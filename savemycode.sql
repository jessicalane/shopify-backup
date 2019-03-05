case 
when ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '01. Copper') 
OR ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '04. Supporter') 
OR ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '05. Donor') 
OR ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '06. Patron') 
OR ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '07. Benefactor') 
OR ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '08. Founder') 
OR ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '09. Perry') 
OR ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '10. Caulkins') 
then 'Please consider renewing today.'  
when ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '02. Individual') then 'Please renew today and consider upgrading to our $75 Family level.' 
when ((case when {custentity_tmg_membership_exp_date} < {today} then {custentity_pos_membership_expired} else {pricelevel} end) = '03. Family/Friends') then 'Please renew today and consider upgrading to our $100 Supporter level.' 
else 'ERROR'
end