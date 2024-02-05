#!/bin/sh
#set -x
#####################################################################
# TrueDisk Checker
# By: Team SpecOps @ iX
# simplest way to find a degraded pool (failed disk) 
# will be running `zpool list -H |  cut -f 9` (STATE)
# TrueView Event Notifier triggers when the pool's state != ONLINE
#####################################################################

# define hostname var
IPADDR="`ifconfig igb0 | grep "inet " | awk '{ print $2; exit }'`"
COLLECTD_HOSTNAME="trueview-demo"
HOSTNAME="${COLLECTD_HOSTNAME:-`hostname -f`}"

# do a barrel roll, and again
# check for pools not reporting as ONLINE and send back to collectd and kick out an event notifier
while true;
do
STATUS="zpool list -H |  cut -f 9"
N=0
if [ $(eval $STATUS)  != ONLINE ] ; then
N=1
  echo "PUTVAL \"$HOSTNAME/truedisk-check\" interval=10 DATE:$(eval date +%s) N:$N"
else
N=0
  echo "PUTVAL \"$HOSTNAME/truedisk-check\" interval=10 DATE:$(eval date +%s) N:$N"
fi
  sleep 10
done
